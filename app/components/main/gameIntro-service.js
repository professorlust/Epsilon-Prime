/* _global _F:true */
/*jshint -W003 */
/*jshint -W040 */

(function() {

'use strict';

angular.module('ePrime')
  .service('gameIntro', function($rootScope, ngEcs) {
    var gameIntro = this;

    gameIntro.beforeChange = beforeChange;
    gameIntro.afterChange = afterChange;
    gameIntro.counter = 1;

    var bots = ngEcs.families.bot;
    var startingUnit = bots[0].bot;

    var steps = [
      //{
      //  intro: '<h2>Welcome to Epsilon-prime</h2>In Epsilon-prime your goal is to conquer the planet of ε-prime. You do this by commanding an army of bots to explore and exploit the resources of ε-prime. You can control your bots individually using your mouse and keyboard or by using command scripts written in JavaScript. The game begins with a simple (and very inefficient) set of scripts for exploring and collecting resources. Using just these scripts you could complete this demo in ~2,500 turns. But you can you do better!'
      //},
      { element: '#left-panel',
        intro: 'The game map is located on the left. Use the mouse and scroll wheel (or touch screen) to pan and zoom the map. The A mark is your starting unit.',
        position: 'right'
      },{
        element: '#list',
        intro: 'On the right is your units list.',
        position: 'left'
      },{
        element: '.list-group-item:nth-child(1)',
        intro: 'At this time you have one unit. Here also the starting unit is identified by the <i>A</i> symbol.',
        position: 'left'
      },{
        element: '.list-group-item:nth-child(1) .energy-bar',
        intro: 'This progress bar indicates the unit’s energy and energy storage capacity. The unit begins with no energy but can harvest upto 10 J. Energy is needed to move and collect resources.',
        position: 'left'
      },{
        element: '#play-buttons',
        intro: 'Press the wait key <code class="cfp-hotkeys-key">.</code> or use use the <i class="fa fa-step-forward"></i> button to advance several turns.',
        position: 'right'
      },{
        onafterchange: function() {
          if (startingUnit.E < 2) {
            this.previousStep().refresh();
          }
        },
        element: '.list-group-item:nth-child(1) .energy-bar',
        intro: 'Your unit’s energy will increase.',
        position: 'left'
      },{
        element: '#movement-buttons',
        intro: 'You can now begin exploring the map using the <code class="cfp-hotkeys-key">q</code>-<code class="cfp-hotkeys-key">c</code> keys. The letters <code class="cfp-hotkeys-key">qweadzxc</code> are directions of movement (<code class="cfp-hotkeys-key">q</code> for North West, <code class="cfp-hotkeys-key">c</code> for South East, etc).  Imagine your unit is located at the action key <code class="cfp-hotkeys-key">s</code> on your keyboard. ',
        position: 'right'
      },{
        element: '.list-group-item:nth-child(1) .energy-bar',
        intro: 'You will notice that the energy depletes as you move.  This is because this unit\'s movement cost is greater than its recharge rate.',
        position: 'left'
      },{
        element: '.list-group-item:nth-child(1) .energy-cost',
        intro: 'Above the energy indicator you will find the units movement cost and charging rate.',
        position: 'left'
      },{
        element: '.list-group-item:nth-child(1) .energy-cost .movement-cost',
        intro: 'Notice that the unit requires 1 J to move one space.',
        position: 'left'
      },{
        element: '.list-group-item:nth-child(1) .energy-cost .recharge-rate',
        intro: 'The unit recharges at 5 J per second. At this rate a unit can move five (5) spaces every second, not counting stored energy.',
        position: 'left'
      },{
        element: '#left-panel',
        intro: 'If you encounter an X on the map this is a resource cache (or mine). Collect resources using the action key <code class="cfp-hotkeys-key">s</code>.',
        position: 'right'
      },{
        element: '.list-group-item:nth-child(1) .storage-bar',
        intro: 'This progress bar indicates a unit’s resources and storage capacity. Resources are used to upgrade units or construct new units.',
        position: 'left'
      },{
        element: '.list-group-item:nth-child(1) .upgrade-button',
        intro: 'Upgrading units costs 10 kg.  You should pause the tutorial now and explore.  Return to the tutrial when you have upgraded your unit.  <p /><b>If you continue the tutorial now we will automatically upgrade your unit.  Normally this would cost resources that you need to collect.</b>',
        position: 'left'
      },{
        onafterchange: function() {
          if (startingUnit.mS < 20) {
            startingUnit.S = 20;
            startingUnit.upgrade();
          }
        },
        element: '.list-group-item:nth-child(1) .energy-cost',
        intro: 'Notice that the movement cost and recharge rate are both higher after upgrading. Now the unit requires a more turns to move one space even though recharge rate is higher.  Also notice that the unit is indicated with a <i>@</i>',
        position: 'left'
      },{
        element: '.list-group-item:nth-child(1) .construct-button',
        intro: 'Once a unit has a storage capacity greater than 20 it is able to construct new units.  Constructing new units costs 20 kg.  You should pause the tutorial and continue exploring to collect 20 kg of storage. <br /><b>If you continue the tutorial we will construct a new unit for you.  Again this would normally cost resources that you must to collect.',
        position: 'left'
      },{
        onbeforechange: function() {
          if (bots.length < 2) {
            startingUnit.S = 20;
            startingUnit.construct();
          }
        },
        element: '.list-group-item:nth-child(2)',
        intro: 'Your new unit will appear in the list...',
        position: 'left'
      },{
        element: '#left-panel',
        intro: 'and on the map indicated on with an A.',
        position: 'right'
      },{
        element: '.list-group-item:nth-child(2) .energy-cost',
        intro: 'Notice that the movement cost and recharge rate are again low.',
        position: 'left'
      },{
        element: '.list-group-item:nth-child(2)',
        intro: 'Small units can also charge from larger units. Make the new unit active unit by clicking the <i>A</i> in the bot list...',
        position: 'left'
      },{
        element: '.list-group-item:nth-child(2)',
        intro: 'Now press the action key <code class="cfp-hotkeys-key">s</code> to charge the Rover using the Base’s energy. This is the action key.  It is also used to unload any unit storage to the base and to mine resources.',
        position: 'left',
        onafterchange: function() {
          if (!bots[1].active) {
            this.previousStep();
          }
        }
      },{
        element: '.list-group-item:nth-child(1)',
        intro: 'You can use this dropdown to set a bots automatic actions each turn. Select \'Construct\' for the base...',
        position: 'left'
      },
      { element: '.list-group-item:nth-child(2)',
        intro: 'and \'Collect\' for the bot.',
        position: 'left'
      },
      { element: '#play-buttons',
        intro: 'Press play button to automatically cycle turns and watch your bots work autonomously.',
        position: 'right'
      },
      { element: '#scripts-button',
        intro: 'You can modify the action scripts here.',
        position: 'top'
      },
      { element: '#save-button',
        intro: 'Your game is automatically saved approximately every 60 seconds.',
        position: 'left'
      },
      { element: '#stats-button',
        intro: 'Check your progress here.',
        position: 'left' },
      { intro: 'How quickly can you collect 500 kg in the base unit?  <h3>Good luck!</h3>' }
    ];

    gameIntro.options = {
      disableInteraction: false,
      showStepNumbers: true,
      steps: steps
    };

    function beforeChange() {
      var intro = this;
      refreshIntro(intro);
      var currentItem = intro._introItems[intro._currentStep];
      if (currentItem.onbeforechange) {
        $rootScope.$apply(function() {
          currentItem.onbeforechange.call(intro);
        });
        refreshIntro(intro);
      }
    }

    function afterChange() {
      var intro = this;
      gameIntro.counter = intro._currentStep+1;
      refreshIntro(intro);
      var currentItem = intro._introItems[intro._currentStep];
      if (currentItem.onafterchange) {
        $rootScope.$apply(function() {
          currentItem.onafterchange.call(intro);
        });
        refreshIntro(intro);
      }
    }

    function refreshIntro(intro) {
      for (var i = 0; i < intro._options.steps.length; i++) {
        var currentItem = intro._introItems[i];
        var step = intro._options.steps[i];
        if (step.element) {
          currentItem.element = document.querySelector(step.element);
          currentItem.position = step.position;
        }
      }
    }

  });

})();
