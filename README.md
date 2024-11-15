# Vote Application #

A simple voting application built with **React** and **Vite**. This app allows users to log in, vote for candidates, and view voting statistics. It supports two types of users:

- **Regular Users**: Can vote for candidates on the main dashboard.
- **Admin Users**: Have access to an admin page where they can view all users' voting status and track the total votes for each candidate in a chart.

## Features

### Login Page
- **Regular Users** and **Admin Users** can log in with their credentials.
- After login, users are directed to the main dashboard or admin page based on their role.

### Voting Dashboard
- Both **Regular Users** and **Admin Users** can vote for a candidate.
- Each user can only vote once, and after voting, they cannot change their vote.
  
### Admin Page (For Admins Only)
- **Admin Users** can view:
  - A list of all users and their voting status (whether they have voted or not).
  - A chart displaying the number of votes for each candidate.

### Voting Stats (Chart)
- The **Chart.js** integration shows how many votes each candidate has received, with real-time updates as users cast their votes.

## Tech Stack

- **Frontend**: React.js
- **Development Tooling**: Vite (for fast development and build processes)
- **State Management**: React Context API
- **Styling**: CSS Modules
- **Charting**: Chart.js (for displaying voting data)

