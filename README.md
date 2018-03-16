## Triton Meal Planner

### Table of Contents
+ [POV](#pov)
+ [Inspirations](#inspirations)
+ [User Base](#user-base)
+ [Unique Interactions](#unique-interactions)
+ [Core Interaction](#core-interaction)
+ [Alignment with Studio Brief (Automation)](#alignment-with-studio-brief-automation)
+ [Task Descriptions](#task-descriptions)
+ [Workflows](#workflows)
+ [Elevator Pitch](#elevator-pitch)
+ [Walkthrough Script](#walkthrough-script)
+ [Code and Build](#code-and-build)
+ [Contributors](#contributors)

### POV
As UCSD students who spend the bulk of our time on-campus, it can be difficult to plan meals since our options are severely limited to HDH's offerings. And even though HDH posts nutritional information for its food items on its website, it is a difficult and tedious process to construct a full meal plan or even planning for a single meal since it involves navigating multiple links before finally settling on something.

### Inspirations
Some of our current inspirations for this project include Eat This Much (https://eatthismuch.com) and the HDH website. Eat This Much is an online meal planner that allows users to enter a calorie goal and preferred type of diet (e.g. Mediterranean), and then generates a meal plan informed by those preferences. This was an inspiration for obvious reasons: our app aims to build on that idea and provide greater options for preferences and to do so for specifically UCSD students. Our second inspiration was HDH's own website, from where we are scraping the data that our web app relies on. The HDH website was an inspiration in that we saw the fairly comprehensive nutritional details it provided on most, if not all, of HDH's offerings to students, but in a way that simply presented the data for students to use for their own purposes instead of building on that data and providing reasonable services for the students who depend on HDH on a daily basis.

### User Base
Since this web-app is very HDH-specific, the main user base will be UCSD students with dining plans, although it extends to anyone who is on-campus and relies on HDH for food during the day. Although this is fairly restricted, we believe that a simple and specialized site for a smaller target audience would be much more popular and impactful than a more general website that could easily get buried by better existing alternatives for regular meal planning, especially since nothing of the sort exists for regular UCSD students who may rely on HDH.

### Unique Interactions
The best way to complete the task of constructing a UCSD-specific meal plan without our web app would be to go to the HDH website and manually create one while keeping specific parameters in mind. This involves manually clicking on several links to view a single field on that page (the calorie count), keeping track of items the user is interested in (as well as those items' calorie counts and price points), and juggling all that information and fitting some number of the total possible items into a custom meal plan.

### Core Interaction
The basic idea is that users (UCSD students) can input meal preferences (e.g. "vegetarian" within "Muir + Revelle + Marshall", "2" meals under "1500" calories and "12" dollars). From these preferences, the mobile web-app formulates a meal plan for the day (e.g. "a Goody's breakfast burrito" + "a taco salad from Pines' Cantina").

### Alignment with Studio Brief (Automation)
As explained in the POV, constructing a meal plan (or even planning for a single meal) is a difficult and tedious process that involves navigating through multiple links on the HDH website before finally settling on something. This web-app automates the process of navigating through the HDH website and creating a meal plan that fits the given parameters (price point, dietary/caloric restrictions, location preferences, etc.) to save users time daily. The core interaction itself is an automation of this process since it only involves setting preferences as opposed to keeping these preferences in mind and manually attempting to create combinations of meals that fit the given parameters.

### Task Descriptions
#### Make a meal plan for Joe, a UCSD student who's trying to bulk up and needs to eat between 3000 and 4000 calories a day, across 5 meals. Try to make the plan as varied as possible.
1. Go the home screen.
2. Use the meal plan generator to make a plan with between 3000 and 4000 calories for 5 meals.
3. Swap out any repeat meals (e.g. if some sort of salad comes up twice, swap one of the two out).

#### Make a meal plan for yourself.
1. Hit "Start Over" if still on the generated meal plan screen or the Triton Meal Planner header on the navbar.
2. Enter your preferences in the meal generator.
3. If no results appear, try again but widen your parameters.

#### Suppose you will be in the Basement of the computer science building all day, and only want to eat in Warren to save time. Make a meal plan and find directions to the dining hall in Warren.
1. Go to the homescreen again.
2. Make a meal plan that only has meals from Warren so you leave the lab as few times as possible.
3. Choose however many calories you think you will need for one-day sitting in a lab.
4. On the results page, click on the name of the dining hall to get directions.

### Workflows
Our prototype has one primary user task: generating a meal plan (as explained above). Besides that, it has the user task of swapping out individual items from entire meal plans. These two user tasks form the bulk of our functionality since our app is specifically for generating daily meal plans, which is a fairly focused idea. Additionally, our app has various secondary screens such as Help, About, and Login pages, although there is currently no functionality for logged in users.

### Elevator Pitch
There's a reason HDH is consistently ranked pretty low relative to the rest of the administration: it kinda sucks. As UCSD students who spend the bulk of our time on-campus, it can be difficult to plan meals since our options are limited to HDH's offerings. It's a difficult and tedious process to construct a full meal plan or even plan for a single meal, and HDH's website isn't much help. Our web-app, Triton Meal Planner, automates that process of creating a meal plan that fits dietary and caloric restrictions and location preferences to save users time daily.

### Walkthrough Script
Joe is currently bulking: he's trying to get big so he needs to eat between 2000 and 3000 calories a day, preferably in 3 meals. His only dietary restriction is that he's vegetarian and he has a board so he can get around campus pretty easily. But still, he lives in Warren and doesn't want to have to go to Revelle to eat. Somewhere in the Sixth/Warren/Marshall vicinity is good, maybe even Muir. And he knows you can't put a price tag on fitness so he allocates a generous $20 a day for eating since, as we all know, HDH is absurdly overpriced. Joe isn't a fan of [food] so let's swap that out real quick. That's better. And still in his calorie range and dining dollar limit to boot.

### Code and Build
The Triton Meal Planner code base is public and can be found on [GitHub](https://github.com/sumeet-bansal/CSE170). Triton Meal Planner is built using Node.js, Express, and SQLite.


### Contributors
+ Sumeet Bansal ([sumeet-bansal](https://github.com/sumeet-bansal))
+ Austin Rossow ([arossow](https://github.com/Arossow))
