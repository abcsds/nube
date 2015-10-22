Slingshot.fileRestrictions('myFileUploads', {
  allowedFileTypes: ['image/png', 'image/jpeg', 'image/gif'],
  maxSize: null
});

if (Meteor.isClient) {
  // var error = uploader.validate(document.getElementById('input').files[0]);
  // if (error) {
  //   console.error(error);
  // }

  // Template.fileUp.helpers({
  //   progress: function () {
  //     return Math.round(this.uploader.progress() * 100);
  //   }
  // });

  // Template.myPicture.helpers({
  //   url: function () {
  //     //If we are uploading an image, pass true to download the image into cache.
  //     //This will preload the image before using the remote image url.
  //     return this.uploader.url(true);
  //   }
  // });
  Template.fileUp.events({
    'change #fileUp': function (event, instance) {
      event.preventDefault();
      var file = instance.$('#fileUp')[0].files[0];
      console.log(file);

      var uploader = new Slingshot.Upload('myFileUploads');

      uploader.send(file, function (error, downloadUrl) {
        if (error) {
          // Log service detailed response.
          console.error('Error uploading', uploader.xhr.response);
          alert (error);
        }
        else {
          console.log(downloadUrl);
        }
      });
    }
  });
}

if (Meteor.isServer) {

  Slingshot.createDirective('myFileUploads', Slingshot.S3Storage, {
    bucket: Meteor.settings.awsBucket,
    //bucket: 'nube-abcsds',

    acl: 'public-read',
    AWSAccessKeyId: Meteor.settings.AWSAccessKeyId,
    AWSSecretAccessKey: Meteor.settings.AWSSecretAccessKey,
    region: Meteor.settings.region,

    authorize: function () {
      // Deny uploads if user is not logged in.
      // if (!this.userId) {
      //   var message = 'Please login before posting files';
      //   throw new Meteor.Error('Login Required', message);
      // }

      return true;
    },

    key: function (file) {
      //Store file into a directory by the user's username.
      // var user = Meteor.users.findOne(this.userId);
      // return user.username + '/' + file.name;
      console.log(file);
      return file.name;
    }
  });
}
