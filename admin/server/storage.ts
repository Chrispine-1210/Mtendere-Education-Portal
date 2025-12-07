import { 
  users, scholarships, jobOpportunities, partnerInstitutions, 
  blogPosts, teamMembers, applications, aiChatConversations,
  adminNotifications, auditLogs,
  type User, type InsertUser, type Scholarship, type InsertScholarship,
  type JobOpportunity, type InsertJobOpportunity, type PartnerInstitution, 
  type InsertPartnerInstitution, type BlogPost, type InsertBlogPost,
  type TeamMember, type InsertTeamMember, type Application, type InsertApplication,
  type AiChatConversation, type InsertAiChatConversation,
  type AdminNotification, type InsertAdminNotification,
  type AuditLog, type InsertAuditLog
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, ilike, sql, count } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<InsertUser>): Promise<User>;
  deleteUser(id: string): Promise<void>;
  getUsers(limit?: number, offset?: number, search?: string): Promise<{ users: User[], total: number }>;

  // Scholarship methods
  getScholarships(limit?: number, offset?: number, search?: string, status?: string): Promise<{ scholarships: Scholarship[], total: number }>;
  getScholarship(id: string): Promise<Scholarship | undefined>;
  createScholarship(scholarship: InsertScholarship, createdBy: string): Promise<Scholarship>;
  updateScholarship(id: string, updates: Partial<InsertScholarship>): Promise<Scholarship>;
  deleteScholarship(id: string): Promise<void>;

  // Job opportunity methods
  getJobOpportunities(limit?: number, offset?: number, search?: string, status?: string): Promise<{ jobs: JobOpportunity[], total: number }>;
  getJobOpportunity(id: string): Promise<JobOpportunity | undefined>;
  createJobOpportunity(job: InsertJobOpportunity, createdBy: string): Promise<JobOpportunity>;
  updateJobOpportunity(id: string, updates: Partial<InsertJobOpportunity>): Promise<JobOpportunity>;
  deleteJobOpportunity(id: string): Promise<void>;

  // Partner institution methods
  getPartnerInstitutions(limit?: number, offset?: number, search?: string): Promise<{ partners: PartnerInstitution[], total: number }>;
  getPartnerInstitution(id: string): Promise<PartnerInstitution | undefined>;
  createPartnerInstitution(partner: InsertPartnerInstitution, createdBy: string): Promise<PartnerInstitution>;
  updatePartnerInstitution(id: string, updates: Partial<InsertPartnerInstitution>): Promise<PartnerInstitution>;
  deletePartnerInstitution(id: string): Promise<void>;

  // Blog post methods
  getBlogPosts(limit?: number, offset?: number, search?: string, status?: string): Promise<{ posts: BlogPost[], total: number }>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost, createdBy: string): Promise<BlogPost>;
  updateBlogPost(id: string, updates: Partial<InsertBlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: string): Promise<void>;

  // Team member methods
  getTeamMembers(limit?: number, offset?: number, search?: string): Promise<{ members: TeamMember[], total: number }>;
  getTeamMember(id: string): Promise<TeamMember | undefined>;
  createTeamMember(member: InsertTeamMember, createdBy: string): Promise<TeamMember>;
  updateTeamMember(id: string, updates: Partial<InsertTeamMember>): Promise<TeamMember>;
  deleteTeamMember(id: string): Promise<void>;

  // Application methods
  getApplications(limit?: number, offset?: number, search?: string, status?: string): Promise<{ applications: Application[], total: number }>;
  getApplication(id: string): Promise<Application | undefined>;
  createApplication(application: InsertApplication): Promise<Application>;
  updateApplication(id: string, updates: Partial<InsertApplication>): Promise<Application>;
  deleteApplication(id: string): Promise<void>;

  // AI Chat conversation methods
  getChatConversations(limit?: number, offset?: number): Promise<{ conversations: AiChatConversation[], total: number }>;
  getChatConversation(id: string): Promise<AiChatConversation | undefined>;
  createChatConversation(conversation: InsertAiChatConversation): Promise<AiChatConversation>;
  updateChatConversation(id: string, updates: Partial<InsertAiChatConversation>): Promise<AiChatConversation>;

  // Admin notification methods
  getAdminNotifications(limit?: number, offset?: number, targetUserId?: string): Promise<{ notifications: AdminNotification[], total: number }>;
  createAdminNotification(notification: InsertAdminNotification): Promise<AdminNotification>;
  markNotificationAsRead(id: string): Promise<void>;

  // Audit log methods
  getAuditLogs(limit?: number, offset?: number, userId?: string, entityType?: string): Promise<{ logs: AuditLog[], total: number }>;
  createAuditLog(log: InsertAuditLog): Promise<AuditLog>;

  // Analytics methods
  getDashboardStats(): Promise<{
    totalUsers: number;
    totalApplications: number;
    activeScholarships: number;
    activeJobs: number;
    recentActivity: any[];
  }>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: string, updates: Partial<InsertUser>): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ ...updates, updatedAt: sql`now()` })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    await db.delete(users).where(eq(users.id, id));
  }

  async getUsers(limit = 50, offset = 0, search = ""): Promise<{ users: User[], total: number }> {
    const whereClause = search 
      ? ilike(users.username, `%${search}%`) 
      : undefined;

    const [usersList, totalCount] = await Promise.all([
      db.select().from(users)
        .where(whereClause)
        .limit(limit)
        .offset(offset)
        .orderBy(desc(users.createdAt)),
      db.select({ count: count() }).from(users).where(whereClause)
    ]);

    return { users: usersList, total: totalCount[0].count };
  }

  // Scholarship methods
  async getScholarships(limit = 50, offset = 0, search = "", status = ""): Promise<{ scholarships: Scholarship[], total: number }> {
    const conditions = [];
    if (search) conditions.push(ilike(scholarships.title, `%${search}%`));
    if (status) conditions.push(eq(scholarships.status, status as any));
    
    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [scholarshipsList, totalCount] = await Promise.all([
      db.select().from(scholarships)
        .where(whereClause)
        .limit(limit)
        .offset(offset)
        .orderBy(desc(scholarships.createdAt)),
      db.select({ count: count() }).from(scholarships).where(whereClause)
    ]);

    return { scholarships: scholarshipsList, total: totalCount[0].count };
  }

  async getScholarship(id: string): Promise<Scholarship | undefined> {
    const [scholarship] = await db.select().from(scholarships).where(eq(scholarships.id, id));
    return scholarship || undefined;
  }

  async createScholarship(scholarship: InsertScholarship, createdBy: string): Promise<Scholarship> {
    const [newScholarship] = await db
      .insert(scholarships)
      .values({ ...scholarship, createdBy })
      .returning();
    return newScholarship;
  }

  async updateScholarship(id: string, updates: Partial<InsertScholarship>): Promise<Scholarship> {
    const [scholarship] = await db
      .update(scholarships)
      .set({ ...updates, updatedAt: sql`now()` })
      .where(eq(scholarships.id, id))
      .returning();
    return scholarship;
  }

  async deleteScholarship(id: string): Promise<void> {
    await db.delete(scholarships).where(eq(scholarships.id, id));
  }

  // Job opportunity methods
  async getJobOpportunities(limit = 50, offset = 0, search = "", status = ""): Promise<{ jobs: JobOpportunity[], total: number }> {
    const conditions = [];
    if (search) conditions.push(ilike(jobOpportunities.title, `%${search}%`));
    if (status) conditions.push(eq(jobOpportunities.status, status as any));
    
    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [jobsList, totalCount] = await Promise.all([
      db.select().from(jobOpportunities)
        .where(whereClause)
        .limit(limit)
        .offset(offset)
        .orderBy(desc(jobOpportunities.createdAt)),
      db.select({ count: count() }).from(jobOpportunities).where(whereClause)
    ]);

    return { jobs: jobsList, total: totalCount[0].count };
  }

  async getJobOpportunity(id: string): Promise<JobOpportunity | undefined> {
    const [job] = await db.select().from(jobOpportunities).where(eq(jobOpportunities.id, id));
    return job || undefined;
  }

  async createJobOpportunity(job: InsertJobOpportunity, createdBy: string): Promise<JobOpportunity> {
    const [newJob] = await db
      .insert(jobOpportunities)
      .values({ ...job, createdBy })
      .returning();
    return newJob;
  }

  async updateJobOpportunity(id: string, updates: Partial<InsertJobOpportunity>): Promise<JobOpportunity> {
    const [job] = await db
      .update(jobOpportunities)
      .set({ ...updates, updatedAt: sql`now()` })
      .where(eq(jobOpportunities.id, id))
      .returning();
    return job;
  }

  async deleteJobOpportunity(id: string): Promise<void> {
    await db.delete(jobOpportunities).where(eq(jobOpportunities.id, id));
  }

  // Partner institution methods
  async getPartnerInstitutions(limit = 50, offset = 0, search = ""): Promise<{ partners: PartnerInstitution[], total: number }> {
    const whereClause = search 
      ? ilike(partnerInstitutions.name, `%${search}%`) 
      : undefined;

    const [partnersList, totalCount] = await Promise.all([
      db.select().from(partnerInstitutions)
        .where(whereClause)
        .limit(limit)
        .offset(offset)
        .orderBy(desc(partnerInstitutions.createdAt)),
      db.select({ count: count() }).from(partnerInstitutions).where(whereClause)
    ]);

    return { partners: partnersList, total: totalCount[0].count };
  }

  async getPartnerInstitution(id: string): Promise<PartnerInstitution | undefined> {
    const [partner] = await db.select().from(partnerInstitutions).where(eq(partnerInstitutions.id, id));
    return partner || undefined;
  }

  async createPartnerInstitution(partner: InsertPartnerInstitution, createdBy: string): Promise<PartnerInstitution> {
    const [newPartner] = await db
      .insert(partnerInstitutions)
      .values({ ...partner, createdBy })
      .returning();
    return newPartner;
  }

  async updatePartnerInstitution(id: string, updates: Partial<InsertPartnerInstitution>): Promise<PartnerInstitution> {
    const [partner] = await db
      .update(partnerInstitutions)
      .set({ ...updates, updatedAt: sql`now()` })
      .where(eq(partnerInstitutions.id, id))
      .returning();
    return partner;
  }

  async deletePartnerInstitution(id: string): Promise<void> {
    await db.delete(partnerInstitutions).where(eq(partnerInstitutions.id, id));
  }

  // Blog post methods
  async getBlogPosts(limit = 50, offset = 0, search = "", status = ""): Promise<{ posts: BlogPost[], total: number }> {
    const conditions = [];
    if (search) conditions.push(ilike(blogPosts.title, `%${search}%`));
    if (status) conditions.push(eq(blogPosts.status, status as any));
    
    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [postsList, totalCount] = await Promise.all([
      db.select().from(blogPosts)
        .where(whereClause)
        .limit(limit)
        .offset(offset)
        .orderBy(desc(blogPosts.createdAt)),
      db.select({ count: count() }).from(blogPosts).where(whereClause)
    ]);

    return { posts: postsList, total: totalCount[0].count };
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || undefined;
  }

  async createBlogPost(post: InsertBlogPost, createdBy: string): Promise<BlogPost> {
    const [newPost] = await db
      .insert(blogPosts)
      .values({ ...post, createdBy })
      .returning();
    return newPost;
  }

  async updateBlogPost(id: string, updates: Partial<InsertBlogPost>): Promise<BlogPost> {
    const [post] = await db
      .update(blogPosts)
      .set({ ...updates, updatedAt: sql`now()` })
      .where(eq(blogPosts.id, id))
      .returning();
    return post;
  }

  async deleteBlogPost(id: string): Promise<void> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }

  // Team member methods
  async getTeamMembers(limit = 50, offset = 0, search = ""): Promise<{ members: TeamMember[], total: number }> {
    const whereClause = search 
      ? ilike(teamMembers.name, `%${search}%`) 
      : undefined;

    const [membersList, totalCount] = await Promise.all([
      db.select().from(teamMembers)
        .where(whereClause)
        .limit(limit)
        .offset(offset)
        .orderBy(teamMembers.order, desc(teamMembers.createdAt)),
      db.select({ count: count() }).from(teamMembers).where(whereClause)
    ]);

    return { members: membersList, total: totalCount[0].count };
  }

  async getTeamMember(id: string): Promise<TeamMember | undefined> {
    const [member] = await db.select().from(teamMembers).where(eq(teamMembers.id, id));
    return member || undefined;
  }

  async createTeamMember(member: InsertTeamMember, createdBy: string): Promise<TeamMember> {
    const [newMember] = await db
      .insert(teamMembers)
      .values({ ...member, createdBy })
      .returning();
    return newMember;
  }

  async updateTeamMember(id: string, updates: Partial<InsertTeamMember>): Promise<TeamMember> {
    const [member] = await db
      .update(teamMembers)
      .set({ ...updates, updatedAt: sql`now()` })
      .where(eq(teamMembers.id, id))
      .returning();
    return member;
  }

  async deleteTeamMember(id: string): Promise<void> {
    await db.delete(teamMembers).where(eq(teamMembers.id, id));
  }

  // Application methods
  async getApplications(limit = 50, offset = 0, search = "", status = ""): Promise<{ applications: Application[], total: number }> {
    const conditions = [];
    if (status) conditions.push(eq(applications.status, status as any));
    
    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [applicationsList, totalCount] = await Promise.all([
      db.select().from(applications)
        .where(whereClause)
        .limit(limit)
        .offset(offset)
        .orderBy(desc(applications.createdAt)),
      db.select({ count: count() }).from(applications).where(whereClause)
    ]);

    return { applications: applicationsList, total: totalCount[0].count };
  }

  async getApplication(id: string): Promise<Application | undefined> {
    const [application] = await db.select().from(applications).where(eq(applications.id, id));
    return application || undefined;
  }

  async createApplication(application: InsertApplication): Promise<Application> {
    const [newApplication] = await db
      .insert(applications)
      .values(application)
      .returning();
    return newApplication;
  }

  async updateApplication(id: string, updates: Partial<InsertApplication>): Promise<Application> {
    const [application] = await db
      .update(applications)
      .set({ ...updates, updatedAt: sql`now()` })
      .where(eq(applications.id, id))
      .returning();
    return application;
  }

  async deleteApplication(id: string): Promise<void> {
    await db.delete(applications).where(eq(applications.id, id));
  }

  // AI Chat conversation methods
  async getChatConversations(limit = 50, offset = 0): Promise<{ conversations: AiChatConversation[], total: number }> {
    const [conversationsList, totalCount] = await Promise.all([
      db.select().from(aiChatConversations)
        .limit(limit)
        .offset(offset)
        .orderBy(desc(aiChatConversations.updatedAt)),
      db.select({ count: count() }).from(aiChatConversations)
    ]);

    return { conversations: conversationsList, total: totalCount[0].count };
  }

  async getChatConversation(id: string): Promise<AiChatConversation | undefined> {
    const [conversation] = await db.select().from(aiChatConversations).where(eq(aiChatConversations.id, id));
    return conversation || undefined;
  }

  async createChatConversation(conversation: InsertAiChatConversation): Promise<AiChatConversation> {
    const [newConversation] = await db
      .insert(aiChatConversations)
      .values(conversation)
      .returning();
    return newConversation;
  }

  async updateChatConversation(id: string, updates: Partial<InsertAiChatConversation>): Promise<AiChatConversation> {
    const [conversation] = await db
      .update(aiChatConversations)
      .set({ ...updates, updatedAt: sql`now()` })
      .where(eq(aiChatConversations.id, id))
      .returning();
    return conversation;
  }

  // Admin notification methods
  async getAdminNotifications(limit = 50, offset = 0, targetUserId?: string): Promise<{ notifications: AdminNotification[], total: number }> {
    const whereClause = targetUserId 
      ? eq(adminNotifications.targetUserId, targetUserId) 
      : undefined;

    const [notificationsList, totalCount] = await Promise.all([
      db.select().from(adminNotifications)
        .where(whereClause)
        .limit(limit)
        .offset(offset)
        .orderBy(desc(adminNotifications.createdAt)),
      db.select({ count: count() }).from(adminNotifications).where(whereClause)
    ]);

    return { notifications: notificationsList, total: totalCount[0].count };
  }

  async createAdminNotification(notification: InsertAdminNotification): Promise<AdminNotification> {
    const [newNotification] = await db
      .insert(adminNotifications)
      .values(notification)
      .returning();
    return newNotification;
  }

  async markNotificationAsRead(id: string): Promise<void> {
    await db
      .update(adminNotifications)
      .set({ isRead: true })
      .where(eq(adminNotifications.id, id));
  }

  // Audit log methods
  async getAuditLogs(limit = 50, offset = 0, userId?: string, entityType?: string): Promise<{ logs: AuditLog[], total: number }> {
    const conditions = [];
    if (userId) conditions.push(eq(auditLogs.userId, userId));
    if (entityType) conditions.push(eq(auditLogs.entityType, entityType));
    
    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [logsList, totalCount] = await Promise.all([
      db.select().from(auditLogs)
        .where(whereClause)
        .limit(limit)
        .offset(offset)
        .orderBy(desc(auditLogs.createdAt)),
      db.select({ count: count() }).from(auditLogs).where(whereClause)
    ]);

    return { logs: logsList, total: totalCount[0].count };
  }

  async createAuditLog(log: InsertAuditLog): Promise<AuditLog> {
    const [newLog] = await db
      .insert(auditLogs)
      .values(log)
      .returning();
    return newLog;
  }

  // Analytics methods
  async getDashboardStats(): Promise<{
    totalUsers: number;
    totalApplications: number;
    activeScholarships: number;
    activeJobs: number;
    recentActivity: any[];
  }> {
    const [
      totalUsersResult,
      totalApplicationsResult,
      activeScholarshipsResult,
      activeJobsResult,
      recentLogs
    ] = await Promise.all([
      db.select({ count: count() }).from(users),
      db.select({ count: count() }).from(applications),
      db.select({ count: count() }).from(scholarships).where(eq(scholarships.status, 'published')),
      db.select({ count: count() }).from(jobOpportunities).where(eq(jobOpportunities.status, 'published')),
      db.select().from(auditLogs).limit(10).orderBy(desc(auditLogs.createdAt))
    ]);

    return {
      totalUsers: totalUsersResult[0].count,
      totalApplications: totalApplicationsResult[0].count,
      activeScholarships: activeScholarshipsResult[0].count,
      activeJobs: activeJobsResult[0].count,
      recentActivity: recentLogs
    };
  }
}

export const storage = new DatabaseStorage();
