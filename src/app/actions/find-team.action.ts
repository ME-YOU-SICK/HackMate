
'use server';

import { z } from 'zod';
import { auth } from '@/lib/firebase';
import { db } from '@/lib/firebase';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import type { UserProfile } from '@/lib/db';
import { createNotification } from '@/lib/db';

const findTeamSchema = z.object({
  teamSize: z.coerce.number().min(1).max(10),
  projectIdea: z.string().optional(),
  neededRoles: z.array(z.string()).min(1, "Please select at least one role."),
  preferredTech: z.array(z.string()).min(1, "Please select at least one technology."),
});

// A simplified mapping of roles to potential skills/tech
const roleSkillMapping: Record<string, string[]> = {
  'frontend-developer': ['react', 'next.js', 'vue.js', 'angular', 'svelte', 'tailwind-css', 'typescript', 'javascript'],
  'backend-developer': ['node.js', 'express.js', 'django', 'flask', 'python', 'java', 'go', 'rust'],
  'full-stack-developer': ['react', 'node.js', 'typescript', 'next.js', 'python'],
  'ui-ux-designer': ['figma', 'ui/ux-design'],
  // Add more mappings as needed
};

export async function findTeamAction(formData: FormData) {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    return { success: false, error: "You must be logged in to find a team." };
  }

  const rawData = {
    teamSize: formData.get('teamSize'),
    projectIdea: formData.get('projectIdea')?.toString(),
    neededRoles: JSON.parse(formData.get('neededRoles') as string || '[]'),
    preferredTech: JSON.parse(formData.get('preferredTech') as string || '[]'),
  };

  const parsed = findTeamSchema.safeParse(rawData);

  if (!parsed.success) {
    return { success: false, error: "Invalid input.", issues: parsed.error.flatten().fieldErrors };
  }

  const { teamSize, projectIdea, neededRoles, preferredTech } = parsed.data;

  try {
    // 1. Get current user's profile and connections
    const userDocRef = doc(db, 'users', currentUser.uid);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      return { success: false, error: "Your user profile could not be found." };
    }
    const userProfile = userDoc.data() as UserProfile;
    const connectionIds = userProfile.connections || [];

    if (connectionIds.length === 0) {
      return { success: false, error: "You have no connections to search from. Add connections to find teammates." };
    }

    // 2. Fetch profiles of all connections
    const connectionsQuery = query(collection(db, 'users'), where('uid', 'in', connectionIds));
    const connectionsSnapshot = await getDocs(connectionsQuery);
    const connections = connectionsSnapshot.docs.map(doc => doc.data() as UserProfile);

    // 3. Filter Stage 1: Role and Tech Match
    const potentialMatches = connections.filter(conn => {
      const userSkills = conn.skills?.map(s => s.toLowerCase()) || [];
      const hasRoleMatch = neededRoles.some(role => {
        const requiredSkills = roleSkillMapping[role] || [];
        return requiredSkills.some(rs => userSkills.includes(rs));
      });
      const hasTechMatch = preferredTech.some(tech => userSkills.includes(tech.toLowerCase()));
      return hasRoleMatch && hasTechMatch;
    });

    // 4. Rank Candidates
    const rankedMatches = potentialMatches.sort((a, b) => {
      const scoreA = (a.pastEvents?.length || 0) * 2 + (a.pastProjects?.length || 0) + (a.skills?.length || 0);
      const scoreB = (b.pastEvents?.length || 0) * 2 + (b.pastProjects?.length || 0) + (b.skills?.length || 0);
      return scoreB - scoreA; // Higher score first
    });

    // 5. Select Team
    const finalTeam: { user: UserProfile, assignedRole: string }[] = [];
    const assignedUserIds = new Set<string>();

    for (const role of neededRoles) {
      if (finalTeam.length >= teamSize) break;
      
      const bestMatchForRole = rankedMatches.find(match => 
        !assignedUserIds.has(match.uid) &&
        (roleSkillMapping[role] || []).some(rs => match.skills?.map(s => s.toLowerCase()).includes(rs))
      );

      if (bestMatchForRole) {
        finalTeam.push({ user: bestMatchForRole, assignedRole: role });
        assignedUserIds.add(bestMatchForRole.uid);
      }
    }
    
    // Fill remaining spots if team is not full
    if (finalTeam.length < teamSize) {
        for (const match of rankedMatches) {
            if (finalTeam.length >= teamSize) break;
            if (!assignedUserIds.has(match.uid)) {
                finalTeam.push({ user: match, assignedRole: 'General' }); // Assign a general role
                assignedUserIds.add(match.uid);
            }
        }
    }

    if (finalTeam.length === 0) {
        return { success: false, error: "Could not find any suitable matches in your connections based on the criteria." };
    }

    // 6. Send Notifications
    for (const member of finalTeam) {
      await createNotification({
        recipientId: member.user.uid,
        senderId: currentUser.uid,
        senderName: userProfile.fullName,
        type: 'TEAM_INVITE',
        message: `${userProfile.fullName} has invited you to join their team!`,
        role: member.assignedRole,
        projectIdea: projectIdea,
      });
    }

    const suggestedTeammates = finalTeam.map(m => ({
        name: m.user.fullName,
        role: m.assignedRole,
        skills: m.user.skills?.slice(0, 3) || [],
    }));

    return { 
        success: true, 
        data: {
            reasoning: `Found ${finalTeam.length} strong matches from your connections based on your criteria. Invitations have been sent.`,
            suggestedTeammates,
        }
    };

  } catch (error: any) {
    console.error("Find team action error:", error);
    return { success: false, error: "An unexpected error occurred while finding your team." };
  }
}
