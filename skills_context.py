# This file will store functions and data related to skills and context.

class SkillsContextManager:
    def __init__(self):
        self.skills = []
        self.context_data = {}

    def add_skill(self, skill_name, description=""):
        """Adds a new skill to the manager."""
        self.skills.append({"name": skill_name, "description": description})
        print(f"Skill '{skill_name}' added.")

    def update_context(self, key, value):
        """Updates a piece of context data."""
        self.context_data[key] = value
        print(f"Context '{key}' updated.")

    def get_skills(self):
        """Returns the list of current skills."""
        return self.skills

    def get_context(self):
        """Returns the current context data."""
        return self.context_data

    def display_all(self):
        """Displays all skills and context data."""
        print("\n--- Current Skills ---")
        if not self.skills:
            print("No skills defined.")
        for skill in self.skills:
            print(f"- {skill['name']}: {skill['description']}")

        print("\n--- Current Context ---")
        if not self.context_data:
            print("No context defined.")
        for key, value in self.context_data.items():
            print(f"- {key}: {value}")

if __name__ == "__main__":
    manager = SkillsContextManager()
    manager.add_skill("Node.js", "Backend development with Node.js and Express.")
    manager.add_skill("Sequelize", "ORM for interacting with MySQL database.")
    manager.add_skill("MySQL", "Relational database management.")
    manager.add_skill("Web Components", "Frontend development with native browser components.")
    manager.add_skill("Authentication", "User login and registration with JWT.")
    manager.add_skill("Bcrypt.js", "Password hashing for security.")
    manager.add_skill("JSON Web Tokens (JWT)", "Token-based authentication.")
    manager.add_skill("User Approval Workflow", "Admin approval required for 'socio' role before login.")
    manager.add_skill("Admin Panel Features", "View and approve pending users.")
    manager.add_skill("Capacitor.js", "Wrapper for native Android/iOS application packaging.")
    manager.update_context("project_name", "Club Member Management App")
    manager.update_context("current_phase", "Setting up Frontend for Android APK Packaging with Capacitor")
    manager.update_context("backend_stack", "Node.js, Express, Sequelize, MySQL, Bcrypt.js, JWT")
    manager.update_context("frontend_stack", "Web Components, Client-side routing for dashboards, Admin UI for approvals, Capacitor for Android/iOS")
    manager.update_context("user_roles", ["admin", "tesorero", "socio"])
    manager.display_all()
