import { AStory } from "./story";
import { Utils } from "../utils";
import { page2 } from "./chapter1.json"
import { Game } from "../main";
import {Screen} from "../navigation"

export class TutorialStory extends AStory {
    buildDOM (): void {
        this.part1();
    }

    private part1(): void {
        const loginContainer = document.getElementById("login-container");
        if (loginContainer != null) {
            loginContainer.className = "login-intro";

            const storyContainer: HTMLSpanElement = document.createElement("span");
            storyContainer.className = "intro-story";

            const story1AContainer: HTMLDivElement = document.createElement("div");
            story1AContainer.textContent = page2.paragraph1;
            storyContainer.appendChild(story1AContainer);

            const breakElement1: HTMLBRElement = document.createElement("br");
            storyContainer.appendChild(breakElement1);

            

            const story1BContainer: HTMLDivElement = document.createElement("div");
            story1BContainer.textContent = page2.paragraph1_b;
            storyContainer.appendChild(story1BContainer);

            loginContainer.appendChild(storyContainer);  

            const taskButton: HTMLDivElement = document.createElement("div");
            taskButton.id = "task-button";
            taskButton.textContent = page2.action1;
            storyContainer.appendChild(taskButton); 

            const progressBar: HTMLProgressElement = document.createElement("progress");
            progressBar.id = "task-progress";
            progressBar.max = 50;
            progressBar.value = 0;
            taskButton.appendChild(progressBar);

            var clickTask = false;
            var taskProgress = 0;
            taskButton.onclick = ()=> { 

                if(clickTask == false ) {
                    clickTask = true;
                    const taskInterval = setInterval( function progressHanlder () {
                        taskProgress += 10; 
                        progressBar.value = taskProgress; 
                        if ( taskProgress >= progressBar.max ) {
                            clearInterval(taskInterval);
                            finishPart1();
                        }
                    }, 500);
                }
            };

            function finishPart1(): void {
                if (loginContainer != null) {
                    loginContainer.removeChild(storyContainer);
                }

                TutorialStory.part2();
                return;
            }
        }
    }

    private static part2(): void {
        const loginContainer = document.getElementById("login-container");
        if (loginContainer != null) {
            loginContainer.className = "login-intro";

            const storyContainer: HTMLSpanElement = document.createElement("span");
            storyContainer.className = "intro-story";

            const story2AContainer: HTMLDivElement = document.createElement("div");
            story2AContainer.textContent = page2.paragraph2;
            storyContainer.appendChild(story2AContainer);

            const breakElement2: HTMLBRElement = document.createElement("br");
            storyContainer.appendChild(breakElement2);

            const story2BContainer: HTMLDivElement = document.createElement("div");
            story2BContainer.textContent = page2.paragraph2_b;
            storyContainer.appendChild(story2BContainer);

            loginContainer.appendChild(storyContainer);  

            const taskOptions: HTMLDivElement = document.createElement("div");
            taskOptions.id = "task-options";
            storyContainer.appendChild(taskOptions);

            const taskButton_a: HTMLDivElement = document.createElement("div");
            taskButton_a.id = "task-button-a";
            taskButton_a.textContent = page2.action2_a;
            taskOptions.appendChild(taskButton_a); 

            const progressBar_a: HTMLProgressElement = document.createElement("progress");
            progressBar_a.id = "task-progress-a";
            progressBar_a.max = 50;
            progressBar_a.value = 0;
            taskButton_a.appendChild(progressBar_a);

            const taskButton_b: HTMLDivElement = document.createElement("div");
            taskButton_b.id = "task-button-b";
            taskButton_b.textContent = page2.action2_b;
            taskOptions.appendChild(taskButton_b); 

            const progressBar_b: HTMLProgressElement = document.createElement("progress");
            progressBar_b.id = "task-progress-b";
            progressBar_b.max = 300;
            progressBar_b.value = 0;
            taskButton_b.appendChild(progressBar_b);

            var clickTask = false;
            var taskProgress = 0;
            taskButton_a.onclick = ()=> { 
                taskOptions.removeChild(taskButton_b); 

                if(clickTask == false ) {
                    clickTask = true;
                    const taskInterval = setInterval( function progressHanlder () {
                        taskProgress += 10; 
                        progressBar_a.value = taskProgress; 
                        if ( taskProgress >= progressBar_a.max ) {
                            clearInterval(taskInterval);
                            finishPart2_A();
                        }
                    }, 500);
                }
            };

            taskButton_b.onclick = ()=> { 
                taskOptions.removeChild(taskButton_a); 

                if(clickTask == false ) {
                    clickTask = true;
                    const taskInterval = setInterval( function progressHanlder () {
                        taskProgress += 10; 
                        progressBar_b.value = taskProgress; 
                        if ( taskProgress >= progressBar_b.max ) {
                            clearInterval(taskInterval);
                            finishPart2_B();
                        }
                    }, 500);
                }
            };

            function finishPart2_A(): void {
                if (loginContainer != null) {
                    loginContainer.removeChild(storyContainer);
                }


                Utils.showNavDiv();
                Utils.showHeader();
                Game.getNavigationState().setScreen(Screen.Profile);
                return;
            }

            function finishPart2_B(): void {
                if (loginContainer != null) {
                    loginContainer.removeChild(storyContainer);
                }

                
                Utils.showNavDiv();
                Utils.showHeader();
                Game.getNavigationState().setScreen(Screen.Profile);
                return;
            }
        }
    }

    clearDOM(): void {
        Utils.clearAllDOM();
    }
}