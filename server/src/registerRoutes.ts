import { Express } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Mock data for now - will be replaced with real database later
let users = [
  {
    id: 1,
    email: 'admin@mtendere.com',
    password: '$2b$10$WYCZRsdL1cGHie1i9PjSguzSrCHOwH0EvFw2Pi0eUtjjELZLJOQqG', // password: admin123
    firstName: 'Admin',
    lastName: 'User',
    username: 'admin',
    role: 'admin',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

let scholarships: any[] = [];
let jobs: any[] = [];
let applications: any[] = [];
let partners: any[] = [];
let testimonials: any[] = [];
let blogPosts: any[] = [];
let teamMembers: any[] = [];

export async function registerRoutes(app: Express) {
  // Authentication middleware
  const authenticateToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET || 'mtendere-secret-key', (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };

  // Admin middleware
  const requireAdmin = (req: any, res: any, next: any) => {
    if (req.user.role !== 'admin') {
      return res.sendStatus(403);
    }
    next();
  };

  // Auth endpoints
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const user = users.find(u => u.email === email);
      
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'mtendere-secret-key',
        { expiresIn: '24h' }
      );

      res.json({ 
        token, 
        user: { 
          id: user.id, 
          email: user.email, 
          role: user.role, 
          firstName: user.firstName, 
          lastName: user.lastName 
        } 
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.post('/api/auth/register', async (req, res) => {
    try {
      const { email, password, firstName, lastName, username } = req.body;
      
      // Check if user already exists
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      
      const newUser = {
        id: users.length + 1,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        username,
        role: 'user',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      users.push(newUser);

      const token = jwt.sign(
        { id: newUser.id, email: newUser.email, role: newUser.role },
        process.env.JWT_SECRET || 'mtendere-secret-key',
        { expiresIn: '24h' }
      );

      res.json({ 
        token, 
        user: { 
          id: newUser.id, 
          email: newUser.email, 
          role: newUser.role, 
          firstName: newUser.firstName, 
          lastName: newUser.lastName 
        } 
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // Admin Dashboard Analytics
  app.get('/api/admin/dashboard', authenticateToken, requireAdmin, async (req, res) => {
    try {
      res.json({
        users: users.length,
        scholarships: scholarships.length,
        jobs: jobs.length,
        applications: applications.length,
        partners: partners.length,
        testimonials: testimonials.length,
        blogPosts: blogPosts.length,
        teamMembers: teamMembers.length,
      });
    } catch (error) {
      console.error('Dashboard error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // Analytics summary
  app.get('/api/analytics/summary', authenticateToken, requireAdmin, async (req, res) => {
    try {
      res.json({
        totalUsers: users.length,
        totalApplications: applications.length,
        totalScholarships: scholarships.length,
        totalJobs: jobs.length,
        totalTestimonials: testimonials.length,
        totalBlogPosts: blogPosts.length,
        totalTeamMembers: teamMembers.length,
        totalPartners: partners.length
      });
    } catch (error) {
      console.error('Analytics error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // Recent activity (mock)
  app.get('/api/analytics', authenticateToken, requireAdmin, async (req, res) => {
    try {
      const mockActivity = [
        { id: 1, event: 'user_registration', timestamp: new Date() },
        { id: 2, event: 'scholarship_created', timestamp: new Date() },
        { id: 3, event: 'application_submitted', timestamp: new Date() },
      ];
      res.json(mockActivity);
    } catch (error) {
      console.error('Recent activity error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // Users CRUD
  app.get('/api/admin/users', authenticateToken, requireAdmin, async (req, res) => {
    try {
      res.json(users.map(u => ({ ...u, password: undefined })));
    } catch (error) {
      console.error('Get users error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.post('/api/admin/users', authenticateToken, requireAdmin, async (req, res) => {
    try {
      const { email, password, firstName, lastName, username, role } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const newUser = {
        id: users.length + 1,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        username,
        role: role || 'user',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      users.push(newUser);
      res.json({ ...newUser, password: undefined });
    } catch (error) {
      console.error('Create user error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.put('/api/admin/users/:id', authenticateToken, requireAdmin, async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const userIndex = users.findIndex(u => u.id === userId);
      
      if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
      }

      const updateData = req.body;
      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
      }

      users[userIndex] = { ...users[userIndex], ...updateData, updatedAt: new Date() };
      res.json({ ...users[userIndex], password: undefined });
    } catch (error) {
      console.error('Update user error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.delete('/api/admin/users/:id', authenticateToken, requireAdmin, async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const userIndex = users.findIndex(u => u.id === userId);
      
      if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
      }

      users.splice(userIndex, 1);
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Delete user error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // Scholarships CRUD
  app.get('/api/admin/scholarships', authenticateToken, requireAdmin, async (req, res) => {
    try {
      res.json(scholarships);
    } catch (error) {
      console.error('Get scholarships error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.post('/api/admin/scholarships', authenticateToken, requireAdmin, async (req, res) => {
    try {
      const newScholarship = {
        id: scholarships.length + 1,
        ...req.body,
        createdBy: (req as any).user.id,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      scholarships.push(newScholarship);
      res.json(newScholarship);
    } catch (error) {
      console.error('Create scholarship error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.put('/api/admin/scholarships/:id', authenticateToken, requireAdmin, async (req, res) => {
    try {
      const scholarshipId = parseInt(req.params.id);
      const scholarshipIndex = scholarships.findIndex(s => s.id === scholarshipId);
      
      if (scholarshipIndex === -1) {
        return res.status(404).json({ error: 'Scholarship not found' });
      }

      scholarships[scholarshipIndex] = { 
        ...scholarships[scholarshipIndex], 
        ...req.body, 
        updatedAt: new Date() 
      };
      res.json(scholarships[scholarshipIndex]);
    } catch (error) {
      console.error('Update scholarship error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.delete('/api/admin/scholarships/:id', authenticateToken, requireAdmin, async (req, res) => {
    try {
      const scholarshipId = parseInt(req.params.id);
      const scholarshipIndex = scholarships.findIndex(s => s.id === scholarshipId);
      
      if (scholarshipIndex === -1) {
        return res.status(404).json({ error: 'Scholarship not found' });
      }

      scholarships.splice(scholarshipIndex, 1);
      res.json({ message: 'Scholarship deleted successfully' });
    } catch (error) {
      console.error('Delete scholarship error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // Jobs CRUD
  app.get('/api/admin/jobs', authenticateToken, requireAdmin, async (req, res) => {
    try {
      res.json(jobs);
    } catch (error) {
      console.error('Get jobs error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.post('/api/admin/jobs', authenticateToken, requireAdmin, async (req, res) => {
    try {
      const newJob = {
        id: jobs.length + 1,
        ...req.body,
        createdBy: (req as any).user.id,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      jobs.push(newJob);
      res.json(newJob);
    } catch (error) {
      console.error('Create job error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.put('/api/admin/jobs/:id', authenticateToken, requireAdmin, async (req, res) => {
    try {
      const jobId = parseInt(req.params.id);
      const jobIndex = jobs.findIndex(j => j.id === jobId);
      
      if (jobIndex === -1) {
        return res.status(404).json({ error: 'Job not found' });
      }

      jobs[jobIndex] = { ...jobs[jobIndex], ...req.body, updatedAt: new Date() };
      res.json(jobs[jobIndex]);
    } catch (error) {
      console.error('Update job error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.delete('/api/admin/jobs/:id', authenticateToken, requireAdmin, async (req, res) => {
    try {
      const jobId = parseInt(req.params.id);
      const jobIndex = jobs.findIndex(j => j.id === jobId);
      
      if (jobIndex === -1) {
        return res.status(404).json({ error: 'Job not found' });
      }

      jobs.splice(jobIndex, 1);
      res.json({ message: 'Job deleted successfully' });
    } catch (error) {
      console.error('Delete job error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // Similar CRUD operations for other entities...
  // Applications, Testimonials, Blog Posts, Team Members, Partners

  // Public endpoints (no auth required)
  app.get('/api/scholarships', async (req, res) => {
    try {
      const activeScholarships = scholarships.filter(s => s.isActive === true);
      res.json(activeScholarships);
    } catch (error) {
      console.error('Get public scholarships error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.get('/api/jobs', async (req, res) => {
    try {
      const activeJobs = jobs.filter(j => j.isActive === true);
      res.json(activeJobs);
    } catch (error) {
      console.error('Get public jobs error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.get('/api/testimonials', async (req, res) => {
    try {
      const approvedTestimonials = testimonials.filter(t => t.isApproved === true);
      res.json(approvedTestimonials);
    } catch (error) {
      console.error('Get public testimonials error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.get('/api/blog-posts', async (req, res) => {
    try {
      const publishedPosts = blogPosts.filter(p => p.isPublished === true);
      res.json(publishedPosts);
    } catch (error) {
      console.error('Get public blog posts error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.get('/api/team-members', async (req, res) => {
    try {
      const activeTeamMembers = teamMembers.filter(t => t.isActive === true);
      res.json(activeTeamMembers);
    } catch (error) {
      console.error('Get public team members error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.get('/api/partners', async (req, res) => {
    try {
      const activePartners = partners.filter(p => p.isActive === true);
      res.json(activePartners);
    } catch (error) {
      console.error('Get public partners error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
}