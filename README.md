# Khung Cửi project

[![Netlify Status](https://api.netlify.com/api/v1/badges/6029781b-d513-4501-8f7a-893507fca784/deploy-status)](https://app.netlify.com/sites/khung-cui/deploys)

✨Live site: <https://khung-cui.netlify.app>

## Project journal

![backgroundwhite-1500px](https://user-images.githubusercontent.com/74447462/171987918-d8578640-f7c4-453d-9737-5abb22283352.png)

<https://user-images.githubusercontent.com/74447462/172033457-d99e9b80-6023-408e-967c-46be477fff68.mp4>

## Known problems

- It needs a database to make redirect based on 'loggedin' status works
- API might no longer works, why don't make it work in my video:

## Credit

| Field        | Source                                        |
| ------------ | --------------------------------------------- |
| music        | timebeing by airtone (c) copyright 2021       |
| set up CI/CD | <https://www.youtube.com/watch?v=TVb05-_vdSc> |

## What does _khung cửi_ mean?

> In English, it's _loom_ -- a piece of equipment for weaving (= making thread into cloth)
>
> <img src="https://user-images.githubusercontent.com/74447462/171987521-6addd52e-5fcf-4b12-8bd1-82d1fc7ee423.jpg" style="width:400px">

## How do I link that name with the streaming service?

1. The layout that films are displayed -- a grid, which is made by crossing columns and rows. Can relate that layout to the patterns often made from a loom.
2. A film isn't a 120' video. It's built up from multiple things (storyline, content, actors, sound, plot twists,...). Those materials can't be mixed. They have to be connected, like the way a spider builds their web. One by one, step by step.

## How CI/CD works

1. I need a GitHub repo first
2. Then links Netlify to that Repo. Netlify uses a thing called WebHooks -- whenever something changes on my repo, WebHooks will send to a notification to Netlify so that Netlify can recognize and decide how to react to that change
3. Initial setup:
   1. (Netlify) set up folder deploy: `build`
   2. (Netlify) command build: `npm run build`
   3. Trigger: whenever I use `push`, Netlify will build and deploy the `build` folder
