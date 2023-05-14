# Super Scrabble

<div>

<h5 align="center">
<a href='https://github.com/tbuller/super-scrabble/blob/main/README.md#Demo'> Demo </a> <span> · </span>  
<a href='https://github.com/tbuller/super-scrabble/blob/main/README.md#Tech'> Tech </a> <span> · </span>
<a href='https://github.com/tbuller/super-scrabble/blob/main/README.md#Spec'> Spec </a> <span> · </span>
<a href='https://github.com/tbuller/super-scrabble/blob/main/README.md#Installation'> Installation </a><span> · </span>
<a href='https://github.com/tbuller/super-scrabble/blob/main/README.md#Features'> Features </a>
<h5>
</div>

# Demo

Click on the image below for a quick demo (please excuse the bad quality from YouTube)

[![Demo link](https://img.youtube.com/vi/M4xBb8z2w_w/0.jpg)](https://www.youtube.com/watch?v=M4xBb8z2w_w)

A multi-player digital version of scrabble. Built with the React framework, using Redux and TypeScript, and Node.js with Express for the API.

# Tech

![Image](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Image](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![Image](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=for-the-badge)
![Image](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Image](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Image](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Image](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)

# Spec

Users can create their own accounts and compete with other users. At the end of the game, the player with the highest score wins, and the win is recorded in the database for use in the leaderboard component.

# Installation

[Clone this repo](https://github.com/tbuller/super-scrabble.git)

In terminal (Mac), run:

```
cd api
npm install
npm start
```
Open another terminal in the same codebase:
```
cd frontend
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

# Features
  
<div>

<h5 align="center">
<a href='https://github.com/tbuller/super-scrabble/blob/main/README.md#Home-page'> Home-page </a> <span> · </span>  
<a href='https://github.com/tbuller/super-scrabble/blob/main/README.md#Game'> Game </a> <span> · </span>
<a href='https://github.com/tbuller/super-scrabble/blob/main/README.md#Game-over'> Game-over </a>
<h5>
</div>

## Home-page
  
On the home page, users are greeted by a row of user icons. Each icon reveals the corresponding user's username when hovered over. The option to create new users is available through a form that appears upon clicking "Create new player". Users can be selected and deselected from the displayed row by clicking on the relevant icons. Once a minimum of two users have been chosen, the "Start Game" button appears. Additionally, the leaderboard, showcasing all players along with their wins and losses, can be viewed by clicking on the "Leader Board" button. Users can then toggle back to player selection. 
  
![Image](https://github.com/tbuller/super-scrabble/blob/main/frontend/public/README_images/super-scrabble-home-screenshot.png)

## Game
  
Each player has a collection of 7 letters to start the game, which is then replenished at the end of each turn so that the player always has 7 letters (until the letters in store run out). Scores are calculated just like in regular Scrabble, with multipliers such as Double Letter, Triple Word etc... A leaderboard in the top right hand corner of the screen shows the running scores of each player. If the player tries to select a letter that is not in their collection, they won't be able to put the letter on the board, and the letter will be highlighted red to warn the user. There are indicators to show who's turn it is, including the highlighted username on the leaderboard.   
  
![Image](https://github.com/tbuller/super-scrabble/blob/main/frontend/public/README_images/super-scrabble-game-page-screenshot.png)
  
Each time the player clicks the button "Next turn", a web API call is made to a dictionary with the user's word. If the word is not valid, a warning will appear (as below) and the user will be prompted to come up with a new word or pass their turn. If the word is invalid, the letters that the player attempted to use will be returned to their collection.  
  
![Image](https://github.com/tbuller/super-scrabble/blob/main/frontend/public/README_images/super-scrabble-error-screenshot.png)  

## Game-over
  
Finally, at the end of the game (when the letters run out), there is a leaderboard that replaces the game component with the results of the game.  
  
![Image](https://github.com/tbuller/super-scrabble/blob/main/frontend/public/README_images/super-scrabble-game-over-screenshot.png)
