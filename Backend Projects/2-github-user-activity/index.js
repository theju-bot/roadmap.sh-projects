const fs = require('fs');
const { get } = require('http');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
});

const githubData = async (userName) => {
  try {
    const data = await fetch(`https://api.github.com/users/${userName}/events`);
    const json = await data.json();
    if (json.status === '404') {
      console.log('User not found');
    } else {
      filterGitHub(json);
    }
    rl.prompt();
  } catch (error) {
    console.log(error);
  }
};

const getActivity = () => {
  console.log(
    'Type the name of github username for user activity & "exit" for quit'
  );
  const userName = rl.prompt();
  rl.on('line', (input) => {
    const useName = input.trim();
    if (useName.toLowerCase() === 'exit') {
      rl.close();
    } else {
      githubData(useName);
    }
  });
};

const filterGitHub = (events) => {
  if (events.length === 0) {
    console.log('No recent activity found.');
    rl.prompt();
    return;
  }
  events.forEach((event) => {
    let action;
    switch (event.type) {
      case 'PushEvent':
        const commitCount = event.payload.commits.length;
        action = `Pushed ${commitCount} ${commitCount === 1 ? 'commit' : 'commits'} to ${event.repo.name}`;
        break;
      case 'IssuesEvent':
        action = `${
          event.payload.action.charAt(0).toUpperCase() +
          event.payload.action.slice(1)
        } an issue in ${event.repo.name}`;
        break;
      case 'WatchEvent':
        action = `Starred ${event.repo.name}`;
        break;
      case 'ForkEvent':
        action = `Forked ${event.repo.name}`;
        break;
      case 'CreateEvent':
        action = `Created ${event.payload.ref_type} in ${event.repo.name}`;
        break;
      default:
        action = `${event.type.replace('Event', '')} in ${event.repo.name}`;
        break;
    }
    console.log(`- ${action}`);
  });
};

getActivity();
