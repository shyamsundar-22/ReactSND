import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileAction';
import isEmpty from '../../validation/is-empty';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      const skillsCSV = profile.skills.join(',');
      profile.company = !isEmpty(profile.company) ? profile.company : '';
      profile.website = !isEmpty(profile.website) ? profile.website : '';
      profile.location = !isEmpty(profile.location) ? profile.location : '';
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.social.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : '';
      profile.social.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : '';
      profile.social.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : '';
      profile.social.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : '';
      profile.social.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : '';

      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.social.twitter,
        facebook: profile.social.facebook,
        linkedin: profile.social.linkedin,
        youtube: profile.social.youtube,
        instagram: profile.social.instagram
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };
    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder='Twitter profile URL'
            name='twitter'
            icon='fab fa-twitter'
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder='Facebook profile URL'
            name='facebook'
            icon='fab fa-facebook'
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder='LinkedIn profile URL'
            name='linkedin'
            icon='fab fa-linkedin'
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
          <InputGroup
            placeholder='Youtube profile URL'
            name='youtube'
            icon='fab fa-youtube'
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
          <InputGroup
            placeholder='Instagram profile URL'
            name='instagram'
            icon='fab fa-instagram'
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }

    const options = [
      { label: 'Select Professional Status', value: 0 },
      { label: 'Dev', value: 'Dev' },
      { label: 'QA', value: 'QA' },
      { label: 'JD', value: 'JD' }
    ];
    return (
      <div className='create-profile'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-10 m-auto'>
              <Link to='/dashboard' className='btn btn-light'>
                Go Back
              </Link>
              <h4 className='display-4 text-center'>Edit profile</h4>
              <small className='d-block-pb-3'>* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder='* Profile Handle'
                  name='handle'
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info='A unique handle for your profile URL. Your full name, company name, nickname'
                />
                <SelectListGroup
                  placeholder='Status'
                  name='status'
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info='Give us a idea of where you are at your career'
                />
                <TextFieldGroup
                  placeholder='Company'
                  name='company'
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info='One you work for'
                />
                <TextFieldGroup
                  placeholder='Website'
                  name='website'
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info='Could be your own website or a company one'
                />
                <TextFieldGroup
                  placeholder='Location'
                  name='location'
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info='City'
                />
                <TextFieldGroup
                  placeholder='* Skills'
                  name='skills'
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info='Please use comma separated values'
                />
                <TextFieldGroup
                  placeholder='Github username'
                  name='githubusername'
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info='Git Repo'
                />
                <TextAreaFieldGroup
                  placeholder='Short Bio'
                  name='bio'
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info='About yourself'
                />
                <div className='mb-3'>
                  <button
                    type='button'
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className='btn btn-light'
                  >
                    Add Social Network Links
                  </button>
                  <span className='text-muted'>Optional</span>
                </div>
                {socialInputs}
                <input
                  type='submit'
                  value='submit'
                  className='btn btn-info btn-block mt-4'
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(CreateProfile)
);
