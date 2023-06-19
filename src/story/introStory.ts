import { AStory } from "./story";
import { Utils } from "../utils/utils";
import { page1 } from "../story/chapter1.json";
import {TutorialStory} from "./tutorialStory";

export class IntroStory extends AStory {
    buildDOM (): void {
        this.part1();
    }

    private part1(): void {
        const loginContainer = document.getElementById("login-container");
        if (loginContainer != null) {
            loginContainer.className = "login-intro";

            const storyContainer: HTMLSpanElement = document.createElement("span");
            storyContainer.className = "intro-story";

            storyContainer.textContent = page1.paragraph1;

            loginContainer.appendChild(storyContainer);  

            const taskButton: HTMLDivElement = document.createElement("div");
            taskButton.id = "task-button";
            taskButton.textContent = page1.action1;
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

                IntroStory.part2();
                return;
            }
        }
    }

    private static part2(): void {
        const loginContainer = document.getElementById("login-container");
        if (loginContainer != null) {

            const storyContainer: HTMLSpanElement = document.createElement("span");
            storyContainer.className = "intro-story";

            storyContainer.textContent = page1.paragraph2;
            loginContainer.appendChild(storyContainer);  

            const taskButton: HTMLDivElement = document.createElement("div");
            taskButton.id = "task-button";
            taskButton.textContent = page1.action2;
            storyContainer.appendChild(taskButton); 

            const progressBar: HTMLProgressElement = document.createElement("progress");
            progressBar.id = "task-progress";
            progressBar.max = 100;
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
                            finishPart2();
                        }
                    }, 500);
                }
            };

            function finishPart2(): void {
                if (loginContainer != null) {
                    loginContainer.removeChild(storyContainer);
                }

                IntroStory.part3();
                return;
            }
        }
    }

    private static part3(): void {
        const loginContainer = document.getElementById("login-container");
        if (loginContainer != null) {

            const storyContainer: HTMLSpanElement = document.createElement("span");
            storyContainer.className = "intro-story";

            storyContainer.textContent = page1.paragraph3;
            loginContainer.appendChild(storyContainer);  

            const taskButton: HTMLDivElement = document.createElement("div");
            taskButton.id = "task-button";
            taskButton.textContent = page1.action3;
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
                            finishPart3();
                        }
                    }, 500);
                }
            };

            function finishPart3(): void {
                if (loginContainer != null) {
                    loginContainer.removeChild(storyContainer);
                }

                IntroStory.part4();
                return;
            }
        }
    }

    private static part4(): void {
        const loginContainer = document.getElementById("login-container");
        if (loginContainer != null) {

            const storyContainer: HTMLSpanElement = document.createElement("span");
            storyContainer.className = "intro-story";

            storyContainer.textContent = page1.paragraph4;
            loginContainer.appendChild(storyContainer);  

            const taskButton: HTMLDivElement = document.createElement("div");
            taskButton.id = "task-button";
            taskButton.textContent = page1.action4;
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
                            finishPart4();
                        }
                    }, 500);
                }
            };

            function finishPart4(): void {
                if (loginContainer != null) {
                    loginContainer.removeChild(storyContainer);
                }

                IntroStory.part5();
                return;
            }
        }
    }

    private static part5(): void {
        const loginContainer = document.getElementById("login-container");
        if (loginContainer != null) {

            const storyContainer: HTMLSpanElement = document.createElement("span");
            storyContainer.className = "intro-story";

            storyContainer.textContent = page1.paragraph5;
            loginContainer.appendChild(storyContainer);  

            const taskButton: HTMLDivElement = document.createElement("div");
            taskButton.id = "task-button";
            taskButton.textContent = page1.action5;
            storyContainer.appendChild(taskButton); 

            const progressBar: HTMLProgressElement = document.createElement("progress");
            progressBar.id = "task-progress";
            progressBar.max = 150;
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
                            finishPart5();
                        }
                    }, 500);
                }
            };

            function finishPart5(): void {
                if (loginContainer != null) {
                    loginContainer.removeChild(storyContainer);
                }
            
                const s: TutorialStory = new TutorialStory();
                s.buildDOM();
                return;
            }
        }
    }

    clearDOM(): void {
        Utils.clearAllDOM();
    }
}