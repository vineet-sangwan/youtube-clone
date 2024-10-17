YouTube Clone
A YouTube Clone application built using React, Redux, and Tailwind CSS. This app allows users to browse random, trending, and subscribed videos, filter videos by tags, and view detailed information about each video.

Table of Contents
Features
Technologies Used
Installation
Usage
Folder Structure
API Integration
Contributing
License
Features
Random, Trending, Subscribed Videos: Browse and view videos based on category.
Search and Filter by Tags: Search and filter videos dynamically by clicking on tags.
Responsive Design: Mobile-first design with responsive layouts.
State Management: Efficient state handling using Redux for video fetching.
Loading and Error Handling: Feedback during data fetching operations.
Technologies Used
React: Library for building user interfaces.
Redux: State management tool for managing video and search states.
Tailwind CSS: Utility-first CSS framework for styling.
React Router: Handles routing between different pages.
Redux Thunk: Middleware for handling async actions in Redux.
Axios: For making API requests.
Installation
Prerequisites
Ensure you have the following installed:

Node.js (v14.x or higher)
npm or yarn
Steps to Install
Clone the repository:

bash
Copy code
git clone (https://github.com/vineet-sangwan/youtube-clone.git)
Navigate to the project folder:

bash
Copy code
cd youtubeclone
Install dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm start
Open your browser:

Go to http://localhost:3000 to view the application in your browser.

Usage
Homepage:

Browse videos based on categories such as Random, Trending, or Subscriptions.
Tag Filter:

Filter videos by clicking on the tags available in the filter section.
Video Details:

Click on any video card to view more detailed information about that video.
Responsive Layout:

The application is optimized for both mobile and desktop devices.
Folder Structure
bash
Copy code
youtubeclone/
├── public/               # Public static files
├── src/
│   ├── components/       # Reusable components (Filter, VideoCard, etc.)
│   ├── pages/            # Pages (Home, VideoDetails, etc.)
│   ├── Redux/            # Redux setup (videoSlice, store)
│   ├── App.js            # Main App component
│   ├── index.js          # React entry point
│   └── styles/           # Custom and Tailwind CSS styles
├── package.json          # Dependencies and scripts
└── README.md             # Project documentation
API Integration
The app integrates with an API to fetch video data. The API calls are handled inside the Redux/videoSlice.js file. The following API interactions are supported:

Random Videos: Fetches random videos when the homepage loads.
Trending Videos: Fetches trending videos.
Subscribed Videos: Displays videos based on user subscriptions.
Filter by Tags: Filters videos based on selected tags.
Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a new feature branch (git checkout -b feature/your-feature).
Commit your changes (git commit -m 'Add your feature').
Push to the branch (git push origin feature/your-feature).
Open a pull request and explain the changes.
