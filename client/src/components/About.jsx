import React from "react";

const About = () => {
  return (
    <div className="container about-container">
      <div className="row">
        <div className="col-md-12 text-center">
          <h1 className="display-4 mb-4">About Our Blog App</h1>
          <p className="lead">
            Welcome to <strong>Your Blog App</strong>! This platform is designed to connect bloggers and readers, providing a space to share stories, insights, and knowledge.
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <h2 className="h3 mt-4">What We Offer</h2>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Create Blogs:</strong> Write and publish your thoughts, stories, or expertise.
            </li>
            <li className="list-group-item">
              <strong>Explore Blogs:</strong> Discover blog posts from various authors on different topics.
            </li>
            <li className="list-group-item">
              <strong>User-Friendly Dashboard:</strong> Manage your blog posts and track your content.
            </li>
            <li className="list-group-item">
              <strong>Engage with Others:</strong> Leave comments and connect with the community.
            </li>
          </ul>

          <h2 className="h3 mt-4">Our Mission</h2>
          <p>
            We aim to empower people to share their stories, ideas, and knowledge. By creating a positive community of bloggers, we believe that every story can inspire and bring change.
          </p>

          <h2 className="h3 mt-4">Why Choose Us?</h2>
          <p>
            Simplicity, creativity, and user empowerment are at the core of our design. We focus on creating a space that is accessible to everyone, regardless of technical experience.
          </p>

          <h2 className="h3 mt-4">Contact Us</h2>
          <p>
            Questions or feedback? Reach out to us at <a href="mailto:support@yourblogapp.com">support@yourblogapp.com</a>.
          </p>

          <p className="thank-you-note text-center mt-5">
            Thank you for being part of our community!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
