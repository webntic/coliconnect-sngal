# Planning Guide

A peer-to-peer package delivery platform connecting individuals who need to ship packages with travelers going to those destinations, making international and domestic shipping more accessible and affordable.

**Experience Qualities**:
1. **Trustworthy** - Every interaction should reinforce safety and reliability through verified profiles, transparent ratings, and secure payment handling
2. **Efficient** - Users should quickly find matches, communicate seamlessly, and track their packages without friction
3. **Empowering** - Both senders and transporters should feel in control with clear information, fair pricing, and responsive support

**Complexity Level**: Complex Application (advanced functionality, likely with multiple views)
This requires multiple user roles (sender/transporter), real-time tracking, matching algorithms, messaging systems, payment processing, verification workflows, and comprehensive profile management across different views.

## Essential Features

### User Registration & Authentication
- **Functionality**: Dual registration flow for senders and transporters with identity verification
- **Purpose**: Establish trust and security from the start by verifying user identities
- **Trigger**: User clicks "Sign Up" and selects role (Sender/Transporter)
- **Progression**: Select role → Enter basic info (name, email, phone) → Verify via SMS/email → Upload ID documents (transporters only) → Complete profile → Access dashboard
- **Success criteria**: User can create account, receive verification code, upload documents, and access their role-specific dashboard

### Profile Management
- **Functionality**: Comprehensive profiles showing ratings, transaction history, and role-specific details
- **Purpose**: Build trust through transparency and allow users to make informed decisions
- **Trigger**: User navigates to "My Profile" or views another user's profile
- **Progression**: View profile → See ratings/reviews → View transaction history → Edit personal details → Update documents (if transporter)
- **Success criteria**: Profiles display accurate information, ratings update after transactions, and users can edit their own profiles

### Package Posting (Senders)
- **Functionality**: Create detailed package delivery requests with size, weight, destination, and timeline
- **Purpose**: Allow senders to clearly communicate their shipping needs
- **Trigger**: Sender clicks "Ship a Package"
- **Progression**: Click new package → Enter details (size, weight, description) → Select pickup location → Choose destination → Set timeline → Publish request → Receive transporter matches
- **Success criteria**: Package request is created, saved to database, and visible to matching transporters

### Route Planning (Transporters)
- **Functionality**: Add upcoming travel routes to match with package delivery requests
- **Purpose**: Enable transporters to monetize existing travel plans
- **Trigger**: Transporter clicks "Add Route"
- **Progression**: Click add route → Enter origin → Enter destination → Set travel dates → Add vehicle details → Specify capacity → Publish route → Receive sender matches
- **Success criteria**: Route is created and matched with relevant package requests

### Smart Matching System
- **Functionality**: Algorithm automatically matches package requests with compatible transporter routes
- **Purpose**: Reduce friction by intelligently connecting senders with suitable transporters
- **Trigger**: New package posted or new route added
- **Progression**: System analyzes new entry → Compares locations, dates, capacity → Calculates compatibility scores → Sends notifications to both parties → Displays matches in dashboard
- **Success criteria**: Relevant matches appear within seconds, notifications sent, and match quality meets user expectations

### In-App Messaging
- **Functionality**: Private chat between matched sender and transporter to discuss details
- **Purpose**: Enable clear communication while keeping conversations on-platform for safety
- **Trigger**: User clicks "Message" on a match
- **Progression**: Click message → Open chat interface → Type and send messages → View message history → Receive real-time notifications → Finalize agreement
- **Success criteria**: Messages deliver instantly, conversation history persists, and users can communicate effectively

### Payment Processing
- **Functionality**: Secure payment handling with escrow and multiple payment methods
- **Purpose**: Protect both parties by holding funds until delivery confirmation
- **Trigger**: Sender accepts a transporter match and confirms booking
- **Progression**: Select transporter → Review price → Choose payment method (mobile money/card) → Process payment → Funds held in escrow → Delivery confirmed → Release payment to transporter
- **Success criteria**: Payments process securely, funds held until confirmation, platform commission calculated correctly

### Real-Time Package Tracking
- **Functionality**: GPS-based tracking showing package location and delivery status
- **Purpose**: Provide peace of mind and transparency throughout the delivery journey
- **Trigger**: Package marked as "Picked Up" by transporter
- **Progression**: Pickup confirmed → Status updates to "In Transit" → Live location displayed on map → Transporter updates progress → Arrival notification → Delivery confirmation required → Status "Delivered"
- **Success criteria**: Location updates in real-time, status changes reflected immediately, and both parties notified at key milestones

### Ratings & Reviews
- **Functionality**: Mutual rating system where both parties review each other after delivery
- **Purpose**: Build reputation and trust within the community
- **Trigger**: Delivery marked as complete
- **Progression**: Delivery confirmed → Prompt to rate experience → Select star rating (1-5) → Write optional review → Submit feedback → Rating added to profile → Average rating updated
- **Success criteria**: Both parties can rate each other, ratings display on profiles, and average scores calculate accurately

### Support & Dispute Resolution
- **Functionality**: Help center and dispute management for issues
- **Purpose**: Provide assistance and resolve conflicts fairly
- **Trigger**: User clicks "Help" or "Report Issue"
- **Progression**: Access help center → Search FAQs → Submit support ticket (if needed) → Describe issue → Upload evidence → Support team reviews → Resolution provided → Case closed
- **Success criteria**: Users can find help resources, submit tickets, and receive timely responses

## Edge Case Handling

- **No Matches Found**: Display "No matches yet" message with tips to improve listing (adjust dates, locations, or pricing)
- **Cancelled Bookings**: Allow cancellation with refund policy (full refund if >48h notice, partial if <48h, none if already picked up)
- **Unreachable Users**: Auto-expire matches after 48h of no response, return package request to active pool
- **Payment Failures**: Retry mechanism with alternative payment method prompt, hold booking for 30 minutes
- **Disputed Deliveries**: Require photo evidence at pickup/delivery, implement mediation process with support team
- **Incomplete Profiles**: Restrict key features (posting packages/routes) until verification complete
- **Network Loss During Tracking**: Cache last known location, display "Last updated X minutes ago" message
- **Fraudulent Activity**: Flag system for suspicious behavior, temporary account suspension pending review

## Design Direction

The design should evoke **reliability, modernity, and community connection**. It must feel professional enough to trust with valuable packages yet approachable and human-centered. The interface should balance serious logistics functionality with the warmth of peer-to-peer connection, using confident colors, clean layouts, and purposeful interactions that make complex processes feel simple.

## Color Selection

A bold, trustworthy palette centered on deep blue with energetic orange accents to balance professionalism with approachability.

- **Primary Color**: Deep Ocean Blue `oklch(0.45 0.12 250)` - Communicates trust, security, and reliability essential for a logistics platform
- **Secondary Colors**: 
  - Soft Gray `oklch(0.95 0.005 250)` for backgrounds and subtle surfaces
  - Charcoal `oklch(0.35 0.01 250)` for secondary text and de-emphasized elements
- **Accent Color**: Vibrant Orange `oklch(0.68 0.18 45)` - Attention-grabbing for CTAs, status indicators, and important actions
- **Foreground/Background Pairings**:
  - Primary Blue `oklch(0.45 0.12 250)`: White text `oklch(1 0 0)` - Ratio 8.2:1 ✓
  - Accent Orange `oklch(0.68 0.18 45)`: White text `oklch(1 0 0)` - Ratio 5.1:1 ✓
  - Background `oklch(0.98 0.005 250)`: Charcoal text `oklch(0.35 0.01 250)` - Ratio 10.8:1 ✓
  - Card surfaces `oklch(1 0 0)`: Primary text `oklch(0.25 0.01 250)` - Ratio 14.2:1 ✓

## Font Selection

Typography should project **modern professionalism with excellent readability** - essential for an app users will rely on for important logistics decisions.

- **Primary Font**: Space Grotesk for headings and UI elements - A geometric sans-serif that feels technical yet friendly
- **Secondary Font**: Inter for body text and forms - Exceptional legibility optimized for interfaces

- **Typographic Hierarchy**:
  - H1 (Page Titles): Space Grotesk Bold/32px/tight leading (-0.02em tracking)
  - H2 (Section Headers): Space Grotesk Semibold/24px/normal leading
  - H3 (Card Titles): Space Grotesk Medium/18px/normal leading
  - Body (Main Content): Inter Regular/16px/relaxed leading (1.6)
  - Small (Meta Info): Inter Regular/14px/normal leading
  - Caption (Timestamps): Inter Regular/12px/normal leading with muted color

## Animations

Animations should **enhance clarity and provide feedback** without slowing down power users. Use purposeful motion to guide attention during status changes (package picked up, payment processed), smooth transitions between views (dashboard to tracking), and subtle feedback on interactions (button presses, form submissions). Keep timing snappy (200-300ms) with natural easing that suggests physical momentum.

## Component Selection

- **Components**:
  - `Card` for package listings, route cards, and profile summaries with subtle shadows for depth
  - `Button` with distinct variants (default for primary actions, outline for secondary, ghost for tertiary)
  - `Avatar` with fallback initials for user profiles throughout the interface
  - `Badge` for status indicators (In Transit, Delivered, Verified) with color coding
  - `Dialog` for confirmation flows (booking confirmations, cancellations)
  - `Tabs` for switching between sender/transporter views and dashboard sections
  - `Form` + `Input` + `Label` for all data entry with consistent spacing
  - `Select` for dropdowns (countries, vehicle types, package sizes)
  - `Textarea` for package descriptions and messages
  - `ScrollArea` for message history and long lists
  - `Separator` to divide logical sections without harsh lines
  - `Tooltip` for icon-only actions and additional context
  - `Progress` for multi-step registration and verification flows
  
- **Customizations**:
  - Custom map component integrating location display with route visualization
  - Timeline component for package journey stages (Posted → Matched → In Transit → Delivered)
  - Match card component showing compatibility score and key details
  - Rating stars component with half-star support for precise scores
  
- **States**:
  - Buttons: Distinct hover (slight scale + brightness), active (pressed depth), disabled (reduced opacity + no pointer)
  - Inputs: Subtle border on hover, prominent ring on focus, error state in red, success state with checkmark
  - Cards: Gentle lift on hover for interactive cards (matches, packages), static for information displays
  
- **Icon Selection**:
  - `Package` for package-related actions
  - `MapPin` for location inputs and displays
  - `Truck` for transporter/vehicle indicators
  - `Star` for ratings
  - `Chat` for messaging
  - `CheckCircle` for confirmations and verified badges
  - `Warning` for alerts and disputes
  - `Calendar` for date selection
  - `User` for profile access
  - `Bell` for notifications
  
- **Spacing**:
  - Page padding: `p-6` on mobile, `p-8` on tablet+
  - Card padding: `p-4` internal spacing
  - Stack spacing: `gap-6` for major sections, `gap-4` for related groups, `gap-2` for tight pairs
  - Button padding: `px-6 py-2.5` for primary actions
  
- **Mobile**:
  - Bottom navigation bar for main sections (Dashboard, Messages, Profile)
  - Collapsible filters that slide up from bottom on mobile
  - Stack cards vertically instead of grid layout below 768px
  - Reduce map height on mobile, prioritize list view with map toggle
  - Single column forms with full-width inputs
  - Simplified header with hamburger menu for secondary navigation
