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
    manager.add_skill("Python Programming", "Proficiency in Python development.")
    manager.add_skill("Cloud Computing", "Experience with AWS, Azure, GCP.")
    manager.update_context("project_name", "AI Assistant")
    manager.update_context("current_phase", "Development")
    manager.display_all()
