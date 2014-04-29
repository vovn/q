'use strict';

var Q = (function(Backbone, Marionette) {

  var C = {},
    M = {},
    V = {};

  // Job(s) model/collection 
  M.Job = Backbone.Model.extend({});

  C.Jobs = Backbone.Collection.extend({ 
    model: M.Job,
    url: 'http://localhost/q-api'
  });

  // Job view
  V.Job = Marionette.ItemView.extend({
    template : function(model) {
      return _.templates.job(model);
    },
    tagName: 'tr',
    initialize: function() {
      
    },
    onRender: function() {
      this.$('.timeago').timeago();
    }
  });

  // NoJobs view
  V.NoJobs = Marionette.ItemView.extend({
    template: function() {
      return _.templates.empty();
    },
    tagName: 'tr'
  });

  // Jobs view
  V.Jobs = Marionette.CollectionView.extend({
    el: '#jobs',
    itemView: V.Job,
    emptyView: V.NoJobs,
    initialize: function() {
      // update job count
      this.listenTo(this.collection, 'all', _.bind(function() {
        $('#jobCount').html(this.collection.length);
        var title = this.collection.length === 0 ? 'Q' : '(' + this.collection.length + ') Q';
        $('title').text(title);
      }, this));
    }
  });

  // instantiate application
  return {
    Collections: C,
    Models: M,
    Views: V
  };

})(Backbone, Marionette);

// get pending jobs
var jobs = new Q.Collections.Jobs();
new Q.Views.Jobs({collection: jobs});
jobs.fetch();

var fetchJobs = function() {
  jobs.fetch();
};


// If the Q has more than 5 documents, 
// create a notification
jobs.on('sync', function() {
  if (this.size() > 5) {
    chrome.notifications.create('q-down', {
      type: 'basic',
      title: 'Q down?',
      message: 'Is the ODP offline?',
      iconUrl: 'img/icon-128.png'
    }, function(){});
  };
});


// update user prefs
jobs.on('sync', function() {
  jobs.each(function(job){
    if (job.get('server') === 'vo-bbp') {
      chrome.notifications.create('vo-bbp', {
        type: 'basic',
        title: 'User Preferences Error',
        message: job.get('user_name') + ' requires a change is his/her preferences.',
        iconUrl: 'img/icon-128.png'
      }, function(){});
    };
  })
});

$('#refreshBtn').on('click', fetchJobs);
setInterval(fetchJobs, 5000);