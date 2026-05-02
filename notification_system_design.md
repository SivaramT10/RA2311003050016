Notification System Design

1. Introduction

This  is an application that uses React to display notifications on a university  in an organized manner. This system uses an API and displays notifications with options for filtering, pagination, and prioritization.


2. Architecture

This application adopts  frontend architecture pattern which includes:

API Layer (`api.js`)
All requests to the backend notification service go through this layer.

Authentication Layer (`auth.js`)
Provides access tokens for accessing secured API services.

Logging Middleware (`logging_middleware/log.js`)
Utility for structured logging to send messages to the server.

Business Logic (`priority.js`)
Contains functions that compute the priority score of a notification.

UI Layer (`App.js`)
Displays notifications and handles the logic related to state management, filtering, and interactions.



3. Notification Prioritization Algorithm

Prioritizing notifications entails ranking them based on their importance and recency:

Weight (importance):

   Placement → 3
   Result → 2
   Event → 1

Recency:
Recent notifications have higher priority than old ones.

Algorithm:

Priority = (Weight × 1000) - Minutes Since Creation


Such that:

 Placement notifications are given first preferance
*Notifications with more recent creation times are displayed first.

4. Features Implemented
  
Fetch notifications from api
filter by type (event, result, placement)
pagination support
display top N notifications
priority based sorting


6. UI/UX Considerations
* Visual Hierarchy: Color-coded indicators based on notification type.
* Readability: A centered, constrained-width layout to reduce eye strain.

7. Conclusion
This is an app build using react which can notify, prioritise, and organise notifications.
