# Mtendere Education Consult - Admin Interface

## Overview

This is a comprehensive admin interface built with React + Vite + Express + TypeScript for Mtendere Education Consult. The system provides a complete educational content management platform with user management, application processing, blog management, job postings, scholarship management, and analytics capabilities. It features a modern React-based admin interface with full CRUD operations and real-time analytics.

## System Architecture

### Frontend Architecture
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7.0 for fast development and optimized production builds
- **UI Components**: Radix UI primitives with custom Tailwind CSS styling
- **State Management**: TanStack React Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS v4 with custom Mtendere Education branding

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Authentication**: JWT-based authentication with bcryptjs password hashing
- **API Design**: RESTful API with comprehensive admin endpoints
- **Middleware**: Express session management and CORS support

## Key Components

### Database Models
- **User Management**: User model with role-based access (admin, user, applicant)
- **Applications**: Application tracking with status workflow (pending, approved, rejected, under_review)
- **Blog System**: BlogPost model with publishing capabilities
- **Analytics**: VisitorLog model for tracking user interactions
- **Services**: Service model for educational offerings

### Authentication & Authorization
- JWT token-based authentication with configurable expiration
- Role-based access control (RBAC) with UserRole enum
- Secure password hashing using bcrypt
- Admin user auto-creation on startup

### Email Notifications
- Automated email notifications for admin actions (create, update, delete)
- Gmail SMTP integration with app password support
- Configurable notification recipients
- HTML email templates with professional styling

### Analytics & Logging
- Request/response logging middleware
- Visitor analytics with IP tracking and user agent detection
- Performance monitoring with response time tracking
- Custom analytics dashboard with charts and metrics

## Data Flow

1. **User Registration/Login**: Users authenticate via JWT tokens, with admin users having elevated privileges
2. **Application Processing**: Applicants submit applications → Admin reviews → Status updates → Email notifications
3. **Content Management**: Admin creates/edits blog posts → Publishing workflow → Public display
4. **Analytics Collection**: Middleware captures visitor data → Database storage → Dashboard visualization
5. **Email Notifications**: Admin actions trigger → Email service → SMTP delivery to configured recipients

## External Dependencies

### Required Services
- **Database**: SQLite (development) or PostgreSQL (production)
- **Email Service**: Gmail SMTP (requires app password)
- **File Storage**: Local filesystem (configurable for cloud storage)

### Node.js Packages
- `express` - Web framework for API server
- `drizzle-orm` - Type-safe database ORM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT token handling
- `pg` - PostgreSQL database driver
- `ws` - WebSocket support
- `zod` - Runtime type validation

### Frontend Libraries
- `@radix-ui` - Accessible UI component primitives
- `@tanstack/react-query` - Server state management
- `lucide-react` - Modern icon library
- `tailwindcss` - Utility-first CSS framework
- `class-variance-authority` - Component variant management
- `wouter` - Lightweight React router

## Deployment Strategy

### Environment Configuration
- Environment-based configuration using `.env` files
- Separate configurations for development (SQLite) and production (PostgreSQL)
- Configurable CORS origins for production deployment
- File upload limits and security settings

### Database Strategy
- SQLite for development and testing
- PostgreSQL recommended for production
- Database migrations handled by SQLModel/SQLAlchemy
- Automatic table creation on startup

### Security Considerations
- JWT secret key configuration (must be changed in production)
- CORS middleware with configurable origins
- Request logging and monitoring
- File upload security with size limits and type restrictions

### Scalability Features
- Async/await throughout for concurrent request handling
- Configurable pagination limits
- Database connection pooling
- Middleware for performance monitoring

## Changelog

```
Changelog:
- June 24, 2025. Initial setup - Created comprehensive FastAPI admin interface
- June 24, 2025. Implemented database models for all content types (users, applications, blog posts, testimonials, team members, scholarships, insights, analytics)
- June 24, 2025. Added JWT authentication system with role-based access control
- June 24, 2025. Created email notification service with HTML templates
- June 24, 2025. Built analytics dashboard with visitor tracking and metrics visualization
- June 24, 2025. Implemented request logging middleware and security headers
- June 24, 2025. Added professional responsive UI with Bootstrap 5 and custom CSS
- June 24, 2025. Connected PostgreSQL database with automatic table creation
- June 24, 2025. Created API endpoints for content management (/api/users, /api/applications, /api/blog-posts)
- June 24, 2025. Application successfully running on port 5000 with full functionality
- June 24, 2025. Implemented complete CRUD operations for all content types (create, read, update, delete)
- June 24, 2025. Added professional modal forms for blog posts, testimonials, team members, and scholarships
- June 24, 2025. Built comprehensive API endpoints with proper validation and error handling
- June 24, 2025. Created interactive admin dashboard with working forms and data management capabilities
- June 24, 2025. Rebuilt admin interface from scratch with complete CRUD functionality for all content types
- June 24, 2025. Fixed all JavaScript errors and implemented professional Bootstrap 5 interface with modal forms
- June 24, 2025. Successfully deployed production-ready admin system with working create, edit, delete operations
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```