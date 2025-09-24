# **App Name**: CivicSamadhaan

## Core Features:

- Statement Prioritization: A drag-and-drop priority queue interface where authorized users can manually reorder and set a statement's priority (Critical, High, Medium, Low).  Smooth transitions, tricolor priority borders, and real-time notifications should provide visual feedback to the user during their use of this tool.
- Automatic Prioritization Suggestions: AI-powered suggestions for statement prioritization. This tool automatically suggests a priority based on the statement's age, public engagement metrics, ministry importance, and deadline proximity.
- Statement Search: Users can search statements. Support searching in both Hindi and English. Faceted search for status (completed, in progress, pending), priority, ministry, and date range.
- Statements Management: Displays statements data with sortable columns for priority, ID, title, official, ministry, category, date, and status.
- User Authentication and Roles: Firebase authentication supporting citizens, government officials, administrators and auditors. Role-based access control restricts access based on the logged-in user's role.
- Reports Generation: Authorized users can generate reports summarizing statements in a desired output format such as PDF.
- Dashboard Analytics: Visualize statement distribution (tricolor pie chart), ministry performance (horizontal bars), and completion trends (line chart). Display geographic heat map of India showing state-wise completion data.

## Style Guidelines:

- Primary color: Saffron (#FF9933), inspired by the Indian flag, will indicate high priority or urgent items.
- Background color: Cream (#FFFEF7), will provide a subtle and clean background for the interface.
- Accent color: Green (#4CAF50), inspired by the Indian flag, this will indicate completed items or success states, and contrast against the saffron primary color.
- Body and headline font: 'Inter' sans-serif font for a professional and modern appearance.
- Note: currently only Google Fonts are supported.
- Use relevant government and transparency-themed icons from Lucide React.
- Responsive, mobile-first design approach ensuring usability across devices. Top navigation bar remains consistent with main content displayed below. Use left borders to communicate status/urgency via tricolor-inspired color coding.
- Subtle animations and transitions on priority changes, adding new updates, and loading data.