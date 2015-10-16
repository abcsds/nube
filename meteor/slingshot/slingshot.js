Slingshot.fileRestrictions("myFileUploads", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
  maxSize: null
});

if (Meteor.isClient) {

  var uploader = new Slingshot.Upload("myFileUploads");

  var error = uploader.validate(document.getElementById('input').files[0]);
  if (error) {
    console.error(error);
  }

  uploader.send(document.getElementById('input').files[0], function (error, downloadUrl) {
    if (error) {
      // Log service detailed response.
      console.error('Error uploading', uploader.xhr.response);
      alert (error);
    }
    else {
      Meteor.users.update(Meteor.userId(), {$push: {"profile.files": downloadUrl}});
    }
  });
}

if (Meteor.isServer) {
  Slingshot.createDirective("myFileUploads", Slingshot.S3Storage, {
    bucket: Meteor.settings.awsBucket,
    // bucket: "nube-abcsds",

    acl: "public-read",

    authorize: function () {
      //Deny uploads if user is not logged in.
      if (!this.userId) {
        var message = "Please login before posting files";
        throw new Meteor.Error("Login Required", message);
      }

      return true;
    },

    key: function (file) {
      //Store file into a directory by the user's username.
      var user = Meteor.users.findOne(this.userId);
      return user.username + "/" + file.name;
    }
  });
}

Template.progressBar.helpers({
  progress: function () {
    return Math.round(this.uploader.progress() * 100);
  }
});

Template.myPicture.helpers({
  url: function () {
    //If we are uploading an image, pass true to download the image into cache.
    //This will preload the image before using the remote image url.
    return this.uploader.url(true);
  }
});
