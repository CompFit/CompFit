import angular from 'angular';

import teams_sidebar from './teams_sidebar';
import create_challenge_modal from './create_challenge_modal';
import create_team_modal from './create_team_modal';
import challenges_sidebar from './challenges_sidebar';
import exercises_sidebar from './exercises_sidebar';
import log_exercise_modal from './log_exercise_modal';
import navbar from './navbar';
import logbutton from './logbutton';

export default angular
    .module( 'app.directives', [] )
    .directive( 'seedSidebar', ['Teams', 'Users', teams_sidebar] )
    .directive( 'createChallengeModal', ['Teams','Users','Challenges', '$timeout', create_challenge_modal] )
    .directive( 'createTeamModal', ['Teams','Users', '$timeout', create_team_modal] )
    .directive( 'challengesSidebar', ['Challenges', challenges_sidebar] )
    .directive( 'exercisesSidebar', ['Exercises', exercises_sidebar] )
    .directive( 'logExerciseModal', ['Exercises','Users', '$timeout', log_exercise_modal] )
    .directive( 'seedNavbar', ['Authentication', navbar] )
    .directive( 'seedLogbutton', logbutton )
    .name;
