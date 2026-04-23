# 🍲 Are U Hungry? - Food Rescue Platform - https://areuhungry.lovable.app/

**Are U Hungry** is a real-time, social-impact web application designed to reduce food waste by bridging the gap between surplus food providers (restaurants, caterers) and those in need (NGOs, volunteers, and individuals). 

Built with modern AI-assisted development practices, this platform features frictionless donation flows, real-time database syncing, and integrated dynamic location routing.

## ✨ Key Features

* **Frictionless Donations:** A streamlined "Donate Food Now" flow that allows users to post surplus food availability instantly without forced account creation.
* **Live 'Find a Meal' Feed:** A dynamically rendering grid of available donations nearby, updating in real-time.
* **Claim & Route System:** Users can claim available food, which updates the database state to prevent double-claiming. 
* **Dynamic Map Integration:** Claimed items provide a direct link to Google Maps, automatically routing the user to the donation coordinates for easy pickup.
* **Responsive Design:** Clean, accessible UI built for both mobile and desktop users.

## 🛠️ Tech Stack

* **Frontend:** React, TypeScript, Vite
* **Styling:** Tailwind CSS, shadcn-ui
* **Backend & Database:** Supabase (PostgreSQL)
* **Development:** Built and prototyped via Lovable.dev

## 🚀 Getting Started

### Prerequisites
* Node.js & npm installed (We recommend using [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
* A Supabase project with a `food_donations` table configured.

### Local Installation

1. **Clone the repository:**
   ```sh
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
Install dependencies:

Bash
npm install
Set up Environment Variables:
Create a .env file in the root directory and add your Supabase connection details:


VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
Start the development server:

Bash
npm run dev
The application will start with auto-reloading enabled.

🗄️ Database Schema
If you are setting this up from scratch, ensure your Supabase database has a food_donations table with the following structure:

id (uuid, primary key)

food_type (text)

quantity (integer)

location (text)

expiration_time (timestamp)

is_claimed (boolean, default: false)

🤝 Contributing & Editing
This project was initially prototyped using Lovable.

You can edit this code by:

Using Lovable: Visit the project link and use prompts to generate new features. Changes will commit automatically.

Local IDE: Clone, edit locally, and push changes back to this repository.

GitHub Codespaces: Launch a Codespace directly from this repository for cloud-based editing.

🌐 Deployment
This project is optimized for static hosting platforms. You can deploy it instantly via the Lovable Share/Publish tool, or connect this GitHub repository to platforms like Netlify or Vercel for continuous integration.