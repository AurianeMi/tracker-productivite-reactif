import { Component, computed, effect, signal } from '@angular/core';

const DAILY_GOAL = 5;

@Component({
  imports: [],
  selector: 'app-productivity-tracker-component',
  styleUrl: './productivity-tracker-component.css',
  templateUrl: './productivity-tracker-component.html',
})
export class ProductivityTrackerComponent {

  // 1. ÉTAT : récupération de la progression depuis localStorage
  completedTasks = signal<number>(
    Number(localStorage.getItem('tasks')) || 0
  );

  // 2. COMPUTED : calcul du pourcentage
  progressPercentage = computed(() =>
    Math.round((this.completedTasks() / DAILY_GOAL) * 100)
  );

  // 2. COMPUTED : message adapté à la progression
  message = computed(() => {
    const percentage = this.progressPercentage();

    if (percentage === 0) {
      return 'Prêt à démarrer la journée ?';
    }

    if (percentage < 100) {
      return 'Continuez comme ça, vous y êtes presque !';
    }

    return 'Félicitations, objectif atteint !';
  });

  // 3. EFFECT : sauvegarde et alerte
  constructor() {
    effect(() => {
      const tasks = this.completedTasks();

      localStorage.setItem('tasks', String(tasks));

      if (tasks >= DAILY_GOAL) {
        window.alert('Bravo, vous avez fini votre journée !');
      }
    });
  }

  // Ajouter une tâche
  addTask(): void {
    if (this.completedTasks() < DAILY_GOAL) {
      this.completedTasks.update(tasks => tasks + 1);
    }
  }

  // Réinitialiser la progression
  resetTasks(): void {
    this.completedTasks.set(0);
  }
}
