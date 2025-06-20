
"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, Edit3, Save, Eye, EyeOff, GraduationCap, User, BookOpen, Award, Briefcase, FileText, Users, Globe, Lightbulb, Target, Settings, CheckCircle, AlertTriangle } from 'lucide-react';

export default function AcademicProfileBuilder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      website: '',
      linkedIn: '',
      orcid: '',
      location: '',
      academicTitle: '',
      currentInstitution: '',
      bio: ''
    },
    education: [],
    experience: [],
    publications: [],
    research: {
      interests: [],
      statement: '',
      currentProjects: []
    },
    skills: {
      technical: [],
      languages: [],
      software: []
    },
    awards: [],
    grants: [],
    conferences: [],
    teaching: [],
    service: [],
    references: [],
    customSections: []
  });

  const [sectionVisibility, setSectionVisibility] = useState({
    personalInfo: true,
    education: true,
    experience: true,
    publications: true,
    research: true,
    skills: true,
    awards: true,
    grants: true,
    conferences: true,
    teaching: true,
    service: true,
    references: true
  });

  const [showCustomSectionModal, setShowCustomSectionModal] = useState(false);
  const [customSectionName, setCustomSectionName] = useState('');
  const [editingCustomSection, setEditingCustomSection] = useState(null);

  const defaultSections = [
    { key: 'personalInfo', title: 'Personal Information', icon: User, required: true },
    { key: 'education', title: 'Education', icon: GraduationCap, required: true },
    { key: 'experience', title: 'Academic Experience', icon: Briefcase, required: false },
    { key: 'publications', title: 'Publications', icon: FileText, required: false },
    { key: 'research', title: 'Research', icon: Lightbulb, required: false },
    { key: 'skills', title: 'Skills & Languages', icon: Target, required: false },
    { key: 'awards', title: 'Awards & Honors', icon: Award, required: false },
    { key: 'grants', title: 'Grants & Funding', icon: BookOpen, required: false },
    { key: 'conferences', title: 'Conferences & Presentations', icon: Globe, required: false },
    { key: 'teaching', title: 'Teaching Experience', icon: Users, required: false },
    { key: 'service', title: 'Academic Service', icon: Settings, required: false },
    { key: 'references', title: 'References', icon: Users, required: false }
  ];

  const steps = [
    'Profile Setup',
    'Personal Info',
    'Education',
    'Experience',
    'Research & Publications',
    'Skills & Additional Info',
    'Review & Finalize'
  ];

  // const addEducation = () => {
  //   setProfile(prev => ({
  //     ...prev,
  //     education: [...prev.education, {
  //       id: Date.now(),
  //       degree: '',
  //       field: '',
  //       institution: '',
  //       location: '',
  //       startDate: '',
  //       endDate: '',
  //       gpa: '',
  //       thesis: '',
  //       advisor: '',
  //       current: false
  //     }]
  //   }));
  // };

  // const addExperience = () => {
  //   setProfile(prev => ({
  //     ...prev,
  //     experience: [...prev.experience, {
  //       id: Date.now(),
  //       position: '',
  //       institution: '',
  //       location: '',
  //       startDate: '',
  //       endDate: '',
  //       description: '',
  //       current: false
  //     }]
  //   }));
  // };

  // const addPublication = () => {
  //   setProfile(prev => ({
  //     ...prev,
  //     publications: [...prev.publications, {
  //       id: Date.now(),
  //       type: 'journal',
  //       title: '',
  //       authors: '',
  //       journal: '',
  //       year: '',
  //       doi: '',
  //       url: ''
  //     }]
  //   }));
  // };

  const addCustomSection = () => {
    if (customSectionName.trim()) {
      setProfile(prev => ({
        ...prev,
        customSections: [...prev.customSections, {
          id: Date.now(),
          name: customSectionName,
          items: []
        }]
      }));
      setSectionVisibility(prev => ({
        ...prev,
        [`custom_${Date.now()}`]: true
      }));
      setCustomSectionName('');
      setShowCustomSectionModal(false);
    }
  };

  const toggleSectionVisibility = (sectionKey) => {
    setSectionVisibility(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const updateProfile = (section, data) => {
    setProfile(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <ProfileSetupStep />;
      case 1:
        return <PersonalInfoStep />;
      case 2:
        return <EducationStep />;
      case 3:
        return <ExperienceStep />;
      case 4:
        return <ResearchPublicationsStep />;
      case 5:
        return <SkillsStep />;
      case 6:
        return <ReviewStep />;
      default:
        return null;
    }
  };

  const ProfileSetupStep = () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Customize Your Academic Profile</h2>
        <p className="text-lg text-gray-600">Choose which sections to include in your academic CV</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Eye className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-blue-900">Section Visibility</h3>
        </div>
        <p className="text-blue-700 text-sm mb-4">
          Toggle sections on/off. You can always change this later. Required sections cannot be disabled.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          {defaultSections.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.key} className="flex items-center justify-between p-4 bg-white rounded-lg border">
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 text-gray-600" />
                  <div>
                    <span className="font-medium text-gray-900">{section.title}</span>
                    {section.required && (
                      <span className="text-xs text-red-500 ml-2">Required</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => !section.required && toggleSectionVisibility(section.key)}
                  disabled={section.required}
                  className={`w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    sectionVisibility[section.key]
                      ? 'bg-blue-600'
                      : section.required 
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-gray-200'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ${
                    sectionVisibility[section.key] ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Plus className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Custom Sections</h3>
          </div>
          <button
            onClick={() => setShowCustomSectionModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Add Custom Section
          </button>
        </div>
        
        {profile.customSections.length > 0 ? (
          <div className="space-y-2">
            {profile.customSections.map((section) => (
              <div key={section.id} className="flex items-center justify-between p-3 bg-white rounded border">
                <span className="font-medium">{section.name}</span>
                <button
                  onClick={() => {
                    setProfile(prev => ({
                      ...prev,
                      customSections: prev.customSections.filter(s => s.id !== section.id)
                    }));
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No custom sections added yet.</p>
        )}
      </div>

      {showCustomSectionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add Custom Section</h3>
            <input
              type="text"
              value={customSectionName}
              onChange={(e) => setCustomSectionName(e.target.value)}
              placeholder="Section name (e.g., Patents, Memberships)"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => {
                  setShowCustomSectionModal(false);
                  setCustomSectionName('');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={addCustomSection}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Section
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const PersonalInfoStep = () => (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Personal Information</h2>
        <p className="text-gray-600">Tell us about yourself</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
          <input
            type="text"
            value={profile.personalInfo.firstName}
            onChange={(e) => updateProfile('personalInfo', { ...profile.personalInfo, firstName: e.target.value })}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
          <input
            type="text"
            value={profile.personalInfo.lastName}
            onChange={(e) => updateProfile('personalInfo', { ...profile.personalInfo, lastName: e.target.value })}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
          <input
            type="email"
            value={profile.personalInfo.email}
            onChange={(e) => updateProfile('personalInfo', { ...profile.personalInfo, email: e.target.value })}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            value={profile.personalInfo.phone}
            onChange={(e) => updateProfile('personalInfo', { ...profile.personalInfo, phone: e.target.value })}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Academic Title</label>
          <input
            type="text"
            placeholder="e.g., PhD Student, Postdoc, Assistant Professor"
            value={profile.personalInfo.academicTitle}
            onChange={(e) => updateProfile('personalInfo', { ...profile.personalInfo, academicTitle: e.target.value })}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Institution</label>
          <input
            type="text"
            value={profile.personalInfo.currentInstitution}
            onChange={(e) => updateProfile('personalInfo', { ...profile.personalInfo, currentInstitution: e.target.value })}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
        <input
          type="text"
          placeholder="City, Country"
          value={profile.personalInfo.location}
          onChange={(e) => updateProfile('personalInfo', { ...profile.personalInfo, location: e.target.value })}
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
          <input
            type="url"
            value={profile.personalInfo.website}
            onChange={(e) => updateProfile('personalInfo', { ...profile.personalInfo, website: e.target.value })}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
          <input
            type="url"
            value={profile.personalInfo.linkedIn}
            onChange={(e) => updateProfile('personalInfo', { ...profile.personalInfo, linkedIn: e.target.value })}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ORCID</label>
          <input
            type="text"
            placeholder="0000-0000-0000-0000"
            value={profile.personalInfo.orcid}
            onChange={(e) => updateProfile('personalInfo', { ...profile.personalInfo, orcid: e.target.value })}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Professional Bio</label>
        <textarea
          rows={4}
          placeholder="Brief professional summary highlighting your academic background and research interests..."
          value={profile.personalInfo.bio}
          onChange={(e) => updateProfile('personalInfo', { ...profile.personalInfo, bio: e.target.value })}
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );

  const EducationStep = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Education</h2>
          <p className="text-gray-600">Add your academic qualifications</p>
        </div>
        <button
          onClick={addEducation}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Plus className="w-4 h-4 inline mr-2" />
          Add Education
        </button>
      </div>

      <div className="space-y-6">
        {profile.education.map((edu, index) => (
          <React.Fragment key={edu.id}>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Education {index + 1}</h3>
                <button
                  onClick={() => {
                    const newEducation = profile.education.filter(e => e.id !== edu.id);
                    updateProfile('education', newEducation);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Degree *</label>
                  <select
                    value={edu.degree}
                    onChange={(e) => {
                      const newEducation = profile.education.map(item =>
                        item.id === edu.id ? { ...item, degree: e.target.value } : item
                      );
                      updateProfile('education', newEducation);
                    }}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Degree</option>
                    <option value="Bachelor's">Bachelor's</option>
                    <option value="Master's">Master's</option>
                    <option value="PhD">PhD</option>
                    <option value="Postdoc">Postdoc</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Field of Study *</label>
                  <input
                    type="text"
                    value={edu.field}
                    onChange={(e) => {
                      const newEducation = profile.education.map(item =>
                        item.id === edu.id ? { ...item, field: e.target.value } : item
                      );
                      updateProfile('education', newEducation);
                    }}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Institution *</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => {
                      const newEducation = profile.education.map(item =>
                        item.id === edu.id ? { ...item, institution: e.target.value } : item
                      );
                      updateProfile('education', newEducation);
                    }}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={edu.location}
                    onChange={(e) => {
                      const newEducation = profile.education.map(item =>
                        item.id === edu.id ? { ...item, location: e.target.value } : item
                      );
                      updateProfile('education', newEducation);
                    }}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => {
                      const newEducation = profile.education.map(item =>
                        item.id === edu.id ? { ...item, startDate: e.target.value } : item
                      );
                      updateProfile('education', newEducation);
                    }}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => {
                      const newEducation = profile.education.map(item =>
                        item.id === edu.id ? { ...item, endDate: e.target.value } : item
                      );
                      updateProfile('education', newEducation);
                    }}
                    disabled={edu.current}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GPA/Grade</label>
                  <input
                    type="text"
                    value={edu.gpa}
                    onChange={(e) => {
                      const newEducation = profile.education.map(item =>
                        item.id === edu.id ? { ...item, gpa: e.target.value } : item
                      );
                      updateProfile('education', newEducation);
                    }}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={edu.current}
                    onChange={(e) => {
                      const newEducation = profile.education.map(item =>
                        item.id === edu.id ? { ...item, current: e.target.checked, endDate: e.target.checked ? '' : item.endDate } : item
                      );
                      updateProfile('education', newEducation);
                    }}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Currently studying here</span>
                </label>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Thesis/Dissertation Title</label>
                  <input
                    type="text"
                    value={edu.thesis}
                    onChange={(e) => {
                      const newEducation = profile.education.map(item =>
                        item.id === edu.id ? { ...item, thesis: e.target.value } : item
                      );
                      updateProfile('education', newEducation);
                    }}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Advisor/Supervisor</label>
                  <input
                    type="text"
                    value={edu.advisor}
                    onChange={(e) => {
                      const newEducation = profile.education.map(item =>
                        item.id === edu.id ? { ...item, advisor: e.target.value } : item
                      );
                      updateProfile('education', newEducation);
                    }}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}

        {profile.experience.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No experience added yet</p>
            <button
              onClick={addExperience}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Your First Experience
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // Fixed helper functions - these should be stable and not recreated on each render
const addEducation = () => {
  setProfile(prev => ({
    ...prev,
    education: [...prev.education, {
      id: Date.now(),
      degree: '',
      field: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      thesis: '',
      advisor: '',
      current: false
    }]
  }));
};

const addExperience = () => {
  setProfile(prev => ({
    ...prev,
    experience: [...prev.experience, {
      id: Date.now(),
      position: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      current: false
    }]
  }));
};

const addPublication = () => {
  setProfile(prev => ({
    ...prev,
    publications: [...prev.publications, {
      id: Date.now(),
      type: 'journal',
      title: '',
      authors: '',
      journal: '',
      year: '',
      doi: '',
      url: ''
    }]
  }));
};

// Fixed ExperienceStep Component
const ExperienceStep = () => {
  const updateExperience = (id, field, value) => {
    setProfile(prev => ({
      ...prev,
      experience: prev.experience.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const removeExperience = (id) => {
    setProfile(prev => ({
      ...prev,
      experience: prev.experience.filter(e => e.id !== id)
    }));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Academic Experience</h2>
          <p className="text-gray-600">Add your research positions, internships, and work experience</p>
        </div>
        <button
          onClick={addExperience}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Plus className="w-4 h-4 inline mr-2" />
          Add Experience
        </button>
      </div>

      <div className="space-y-6">
        {profile.experience.map((exp, index) => (
          <div key={exp.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Experience {index + 1}</h3>
              <button
                onClick={() => removeExperience(exp.id)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Position Title *</label>
                <input
                  type="text"
                  placeholder="e.g., Research Assistant, Postdoctoral Fellow"
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Institution/Organization *</label>
                <input
                  type="text"
                  value={exp.institution}
                  onChange={(e) => updateExperience(exp.id, 'institution', e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="month"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                  disabled={exp.current}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Currently working here</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                rows={3}
                placeholder="Describe your responsibilities, achievements, and key projects..."
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        ))}

        {profile.experience.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No experience added yet</p>
            <button
              onClick={addExperience}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Your First Experience
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Fixed ResearchPublicationsStep Component
const ResearchPublicationsStep = () => {
  const updateResearch = (field, value) => {
    setProfile(prev => ({
      ...prev,
      research: { ...prev.research, [field]: value }
    }));
  };

  const updatePublication = (id, field, value) => {
    setProfile(prev => ({
      ...prev,
      publications: prev.publications.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const removePublication = (id) => {
    setProfile(prev => ({
      ...prev,
      publications: prev.publications.filter(p => p.id !== id)
    }));
  };

  const addProject = () => {
    setProfile(prev => ({
      ...prev,
      research: {
        ...prev.research,
        currentProjects: [...prev.research.currentProjects, {
          id: Date.now(),
          title: '',
          description: '',
          role: '',
          startDate: '',
          funding: ''
        }]
      }
    }));
  };

  const updateProject = (id, field, value) => {
    setProfile(prev => ({
      ...prev,
      research: {
        ...prev.research,
        currentProjects: prev.research.currentProjects.map(item => 
          item.id === id ? { ...item, [field]: value } : item
        )
      }
    }));
  };

  const removeProject = (id) => {
    setProfile(prev => ({
      ...prev,
      research: {
        ...prev.research,
        currentProjects: prev.research.currentProjects.filter(p => p.id !== id)
      }
    }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Research & Publications</h2>
        <p className="text-gray-600">Add your research interests, publications, and ongoing projects</p>
      </div>

      {/* Research Interests */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Research Interests</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Research Statement</label>
            <textarea
              rows={4}
              placeholder="Describe your research interests, methodology, and goals..."
              value={profile.research.statement}
              onChange={(e) => updateResearch('statement', e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Keywords (comma-separated)</label>
            <input
              type="text"
              placeholder="e.g., Machine Learning, Computational Biology, Quantum Physics"
              value={profile.research.interests.join(', ')}
              onChange={(e) => updateResearch('interests', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Publications */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Publications</h3>
          <button
            onClick={addPublication}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Add Publication
          </button>
        </div>

        <div className="space-y-4">
          {profile.publications.map((pub, index) => (
            <div key={pub.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium text-gray-900">Publication {index + 1}</h4>
                <button
                  onClick={() => removePublication(pub.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={pub.type}
                    onChange={(e) => updatePublication(pub.id, 'type', e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="journal">Journal Article</option>
                    <option value="conference">Conference Paper</option>
                    <option value="preprint">Preprint</option>
                    <option value="book">Book</option>
                    <option value="chapter">Book Chapter</option>
                    <option value="thesis">Thesis</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <input
                    type="number"
                    value={pub.year}
                    onChange={(e) => updatePublication(pub.id, 'year', e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={pub.title}
                  onChange={(e) => updatePublication(pub.id, 'title', e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Authors</label>
                  <input
                    type="text"
                    placeholder="Last, F., Second, A., Third, B."
                    value={pub.authors}
                    onChange={(e) => updatePublication(pub.id, 'authors', e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Journal/Venue</label>
                  <input
                    type="text"
                    value={pub.journal}
                    onChange={(e) => updatePublication(pub.id, 'journal', e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">DOI</label>
                  <input
                    type="text"
                    placeholder="10.1000/182"
                    value={pub.doi}
                    onChange={(e) => updatePublication(pub.id, 'doi', e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                  <input
                    type="url"
                    value={pub.url}
                    onChange={(e) => updatePublication(pub.id, 'url', e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>
          ))}

          {profile.publications.length === 0 && (
            <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">No publications added yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Current Research Projects */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Current Research Projects</h3>
          <button
            onClick={addProject}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Add Project
          </button>
        </div>

        <div className="space-y-4">
          {profile.research.currentProjects.map((project, index) => (
            <div key={project.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium text-gray-900">Project {index + 1}</h4>
                <button
                  onClick={() => removeProject(project.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Role</label>
                  <input
                    type="text"
                    placeholder="e.g., Principal Investigator, Co-Investigator"
                    value={project.role}
                    onChange={(e) => updateProject(project.id, 'role', e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={project.description}
                  onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="month"
                    value={project.startDate}
                    onChange={(e) => updateProject(project.id, 'startDate', e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Funding Source</label>
                  <input
                    type="text"
                    placeholder="e.g., NSF, NIH, University Grant"
                    value={project.funding}
                    onChange={(e) => updateProject(project.id, 'funding', e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>
          ))}

          {profile.research.currentProjects.length === 0 && (
            <div className="text-center py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <Lightbulb className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">No current projects added yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Fixed SkillsStep Component
const SkillsStep = () => {
  const updateSkills = (field, value) => {
    setProfile(prev => ({
      ...prev,
      skills: { ...prev.skills, [field]: value }
    }));
  };

  const addAward = () => {
    setProfile(prev => ({
      ...prev,
      awards: [...prev.awards, {
        id: Date.now(),
        title: '',
        organization: '',
        year: '',
        description: ''
      }]
    }));
  };

  const updateAward = (id, field, value) => {
    setProfile(prev => ({
      ...prev,
      awards: prev.awards.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const removeAward = (id) => {
    setProfile(prev => ({
      ...prev,
      awards: prev.awards.filter(a => a.id !== id)
    }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Skills & Additional Information</h2>
        <p className="text-gray-600">Add your technical skills, languages, awards, and other qualifications</p>
      </div>

      {/* Skills Section */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Skills</h3>
          <textarea
            rows={4}
            placeholder="e.g., Python, R, MATLAB, LaTeX, Statistical Analysis, Machine Learning..."
            value={profile.skills.technical.join(', ')}
            onChange={(e) => updateSkills('technical', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Languages</h3>
          <textarea
            rows={4}
            placeholder="e.g., English (Native), Spanish (Fluent), French (Intermediate)..."
            value={profile.skills.languages.join(', ')}
            onChange={(e) => updateSkills('languages', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Software & Tools</h3>
        <textarea
          rows={3}
          placeholder="e.g., Microsoft Office, Adobe Creative Suite, SPSS, Stata, Mathematica..."
          value={profile.skills.software.join(', ')}
          onChange={(e) => updateSkills('software', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Awards & Honors */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Awards & Honors</h3>
          <button
            onClick={addAward}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
          >
            <Plus className="w-4 h-4 inline mr-1" />
            Add Award
          </button>
        </div>

        <div className="space-y-3">
          {profile.awards.map((award, index) => (
            <div key={award.id} className="border border-gray-200 rounded p-3">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900 text-sm">Award {index + 1}</h4>
                <button
                  onClick={() => removeAward(award.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-3 mb-2">
                <div>
                  <input
                    type="text"
                    placeholder="Award Title"
                    value={award.title}
                    onChange={(e) => updateAward(award.id, 'title', e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Organization"
                    value={award.organization}
                    onChange={(e) => updateAward(award.id, 'organization', e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Year"
                    value={award.year}
                    onChange={(e) => updateAward(award.id, 'year', e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <textarea
                  rows={2}
                  placeholder="Description (optional)"
                  value={award.description}
                  onChange={(e) => updateAward(award.id, 'description', e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          ))}

          {profile.awards.length === 0 && (
            <div className="text-center py-6 bg-gray-50 rounded border-2 border-dashed border-gray-300">
              <Award className="w-6 h-6 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">No awards added yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Fixed ReviewStep Component
const ReviewStep = () => (
  <div className="space-y-8">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Review Your Profile</h2>
      <p className="text-gray-600">Review and finalize your academic profile</p>
    </div>

    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="space-y-6">
        {/* Personal Info Summary */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium">{profile.personalInfo.firstName} {profile.personalInfo.lastName}</p>
            <p className="text-gray-600">{profile.personalInfo.academicTitle}</p>
            <p className="text-gray-600">{profile.personalInfo.currentInstitution}</p>
            <p className="text-gray-600">{profile.personalInfo.email}</p>
          </div>
        </div>

        {/* Education Summary */}
        {profile.education.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Education ({profile.education.length})</h3>
            <div className="space-y-2">
              {profile.education.map((edu, index) => (
                <div key={edu.id} className="bg-gray-50 p-3 rounded">
                  <p className="font-medium">{edu.degree} in {edu.field}</p>
                  <p className="text-gray-600">{edu.institution}</p>
                  {edu.gpa && <p className="text-gray-500 text-sm">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience Summary */}
        {profile.experience.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Experience ({profile.experience.length})</h3>
            <div className="space-y-2">
              {profile.experience.map((exp, index) => (
                <div key={exp.id} className="bg-gray-50 p-3 rounded">
                  <p className="font-medium">{exp.position}</p>
                  <p className="text-gray-600">{exp.institution}</p>
                  {exp.current && <span className="text-green-600 text-sm">Current</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Publications Summary */}
        {profile.publications.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Publications ({profile.publications.length})</h3>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-gray-600">{profile.publications.length} publications added</p>
              <div className="mt-2 space-y-1">
                {profile.publications.slice(0, 3).map((pub) => (
                  <p key={pub.id} className="text-sm text-gray-700 truncate">
                    "{pub.title}" - {pub.year}
                  </p>
                ))}
                {profile.publications.length > 3 && (
                  <p className="text-sm text-gray-500">
                    ...and {profile.publications.length - 3} more
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Research Summary */}
        {profile.research.statement && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Research Interests</h3>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-gray-700 text-sm line-clamp-3">{profile.research.statement}</p>
              {profile.research.interests.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500">Keywords:</p>
                  <p className="text-sm text-gray-600">{profile.research.interests.slice(0, 5).join(', ')}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Skills Summary */}
        {(profile.skills.technical.length > 0 || profile.skills.languages.length > 0 || profile.skills.software.length > 0) && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills</h3>
            <div className="bg-gray-50 p-3 rounded">
              {profile.skills.technical.length > 0 && (
                <div className="mb-2">
                  <p className="text-xs text-gray-500">Technical:</p>
                  <p className="text-sm text-gray-600">{profile.skills.technical.slice(0, 5).join(', ')}</p>
                </div>
              )}
              {profile.skills.languages.length > 0 && (
                <div className="mb-2">
                  <p className="text-xs text-gray-500">Languages:</p>
                  <p className="text-sm text-gray-600">{profile.skills.languages.slice(0, 3).join(', ')}</p>
                </div>
              )}
              {profile.skills.software.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500">Software:</p>
                  <p className="text-sm text-gray-600">{profile.skills.software.slice(0, 5).join(', ')}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Awards Summary */}
        {profile.awards.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Awards & Honors ({profile.awards.length})</h3>
            <div className="space-y-2">
              {profile.awards.map((award) => (
                <div key={award.id} className="bg-gray-50 p-3 rounded">
                  <p className="font-medium text-sm">{award.title}</p>
                  <p className="text-gray-600 text-sm">{award.organization} - {award.year}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile Completeness */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Profile Completeness</h3>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Personal Information</span>
                <span className={`text-sm font-medium ${profile.personalInfo.firstName && profile.personalInfo.lastName && profile.personalInfo.email ? 'text-green-600' : 'text-orange-600'}`}>
                  {profile.personalInfo.firstName && profile.personalInfo.lastName && profile.personalInfo.email ? 'Complete' : 'Incomplete'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Education</span>
                <span className={`text-sm font-medium ${profile.education.length > 0 ? 'text-green-600' : 'text-orange-600'}`}>
                  {profile.education.length > 0 ? `${profile.education.length} entries` : 'No entries'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Experience</span>
                <span className={`text-sm font-medium ${profile.experience.length > 0 ? 'text-green-600' : 'text-gray-500'}`}>
                  {profile.experience.length > 0 ? `${profile.experience.length} entries` : 'Optional - No entries'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Research & Publications</span>
                <span className={`text-sm font-medium ${profile.research.statement || profile.publications.length > 0 ? 'text-green-600' : 'text-gray-500'}`}>
                  {profile.research.statement || profile.publications.length > 0 ? 'Added' : 'Optional - Not added'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     {/* Conditional Profile Status */}
    {(() => {
      const isPersonalComplete = profile.personalInfo.firstName && profile.personalInfo.lastName && profile.personalInfo.email;
      const hasEducation = profile.education.length > 0;
      const hasValidEducation = profile.education.every(edu => edu.degree && edu.field && edu.institution);
      const isProfileComplete = isPersonalComplete && hasEducation && hasValidEducation;
      
      if (isProfileComplete) {
        return (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-green-800">Profile Ready!</h3>
                <p className="text-green-700">Your academic profile is complete. You can now discover opportunities that match your background and interests.</p>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-orange-800">Profile Incomplete</h3>
                <p className="text-orange-700 mb-3">Please complete the required sections to proceed:</p>
                <ul className="text-orange-700 text-sm space-y-1">
                  {!isPersonalComplete && <li>• Complete personal information (name and email required)</li>}
                  {!hasEducation && <li>• Add at least one education entry</li>}
                  {hasEducation && !hasValidEducation && <li>• Complete all education entries (degree, field, and institution required)</li>}
                </ul>
              </div>
            </div>
          </div>
        );
      }
    })()}

    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
      <h3 className="font-semibold text-blue-800 mb-2">What's Next?</h3>
      <div className="space-y-2 text-blue-700 text-sm">
        <p>• Browse personalized academic opportunities matching your profile</p>
        <p>• Get preparation guidance for specific positions or programs</p>
        <p>• Track your applications and receive feedback</p>
        <p>• Update your profile anytime to improve matches</p>
      </div>
    </div>
  </div>
);
// Additional helper functions for form validation
const validateRequiredFields = () => {
  const errors = [];
  
  // Check personal info
  if (!profile.personalInfo.firstName.trim()) errors.push('First name is required');
  if (!profile.personalInfo.lastName.trim()) errors.push('Last name is required');
  if (!profile.personalInfo.email.trim()) errors.push('Email is required');
  
  // Check education
  if (profile.education.length === 0) errors.push('At least one education entry is required');
  
  profile.education.forEach((edu, index) => {
    if (!edu.degree.trim()) errors.push(`Education ${index + 1}: Degree is required`);
    if (!edu.field.trim()) errors.push(`Education ${index + 1}: Field of study is required`);
    if (!edu.institution.trim()) errors.push(`Education ${index + 1}: Institution is required`);
  });
  
  return errors;
};

const getProfileCompletionPercentage = () => {
  let totalSections = 6; // Personal, Education, Experience, Research, Skills, Additional
  let completedSections = 0;
  
  // Personal Info
  if (profile.personalInfo.firstName && profile.personalInfo.lastName && profile.personalInfo.email) {
    completedSections++;
  }
  
  // Education
  if (profile.education.length > 0) completedSections++;
  
  // Experience (optional but counts if added)
  if (profile.experience.length > 0) completedSections++;
  
  // Research
  if (profile.research.statement || profile.publications.length > 0) completedSections++;
  
  // Skills
  if (profile.skills.technical.length > 0 || profile.skills.languages.length > 0) completedSections++;
  
  // Additional (awards, etc.)
  if (profile.awards.length > 0) completedSections++;
  
  return Math.round((completedSections / totalSections) * 100);
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Academic Profile Builder</h1>
          </div>
          <div className="text-sm text-gray-500">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`text-xs font-medium ${
                  index <= currentStep ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {renderStepContent()}
      </div>

      {/* Navigation */}
      <div className="bg-white border-t border-gray-200 px-6 py-4 sticky bottom-0">
        <div className="max-w-4xl mx-auto flex justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <button className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
              <Save className="w-4 h-4 mr-2" />
              Save Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
 