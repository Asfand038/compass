"use client"
import Image from "next/image";
import React, { useState } from 'react';
import { ChevronRight, Users, BookOpen, TrendingUp, CheckCircle, Star, ArrowRight, GraduationCap, Search, Target, Award } from 'lucide-react';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { useUser } from '@clerk/nextjs';
export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isSignedIn } = useUser();

React.useEffect(() => {
  if (isSignedIn && user) {
    const registerUser = async () => {
      try {
        const res = await fetch('/api/registration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.emailAddresses[0].emailAddress,
            firstName: user.firstName,
            lastName: user.lastName,
          }),
        });

        const data = await res.json();
        console.log('✅ User registered:', data);
      } catch (err) {
        console.error('❌ Error registering user:', err);
      }
    };

    registerUser();
  }
}, [isSignedIn, user]);

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Compass
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">How it Works</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">Success Stories</a>
              <SignedOut>
              <SignInButton />
              <SignUpButton >
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                  Sign up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn >
              <UserButton />
            </SignedIn>
              
              {/* <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                Get Started
              </button> */}
            </div>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                <Star className="w-4 h-4" />
                <span>Navigate Your Academic Career</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Find Your Perfect
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block">
                  Academic Path
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                From Masters to PhD, research positions to faculty roles - Compass matches you with opportunities that align with your academic journey and helps you succeed every step of the way.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-xl hover:shadow-2xl flex items-center justify-center group">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-blue-200 hover:bg-blue-50 transition-all duration-200">
                  Watch Demo
                </button>
              </div>
              
              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">Free to start</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">Personalized matching</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">Success tracking</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Build Your Profile</h3>
                      <p className="text-gray-600 text-sm">Academic background, interests & goals</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                      <Search className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Discover Opportunities</h3>
                      <p className="text-gray-600 text-sm">Personalized job & program matches</p>
                    </div>
                    <div className="w-5 h-5 border-2 border-blue-300 rounded-full ml-auto animate-pulse"></div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Get Prepared</h3>
                      <p className="text-gray-600 text-sm">Tailored preparation resources</p>
                    </div>
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full ml-auto"></div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Award className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Track Success</h3>
                      <p className="text-gray-600 text-sm">Monitor applications & outcomes</p>
                    </div>
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full ml-auto"></div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Everything You Need for Academic Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Compass provides comprehensive support for every stage of your academic career journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Matching</h3>
              <p className="text-gray-600 leading-relaxed">
                Our AI analyzes your academic profile, research interests, and career goals to match you with the most relevant opportunities in Masters, PhD, research positions, and faculty roles.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl border border-indigo-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Preparation Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Get personalized preparation materials, interview tips, and application guidance tailored to your specific academic field and target positions.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Success Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                Track your applications, get feedback on outcomes, and continuously improve your profile based on real results and market insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Your Path to Academic Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow our proven 4-step process to navigate your academic career with confidence
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-8 top-16 bottom-16 w-0.5 bg-gradient-to-b from-blue-200 to-indigo-200 hidden lg:block"></div>
            
            <div className="space-y-12">
              <div className="flex items-start space-x-8">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  1
                </div>
                <div className="flex-1 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Build Your Academic Profile</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Complete your comprehensive academic profile including your educational background, research interests, publications, skills, and career aspirations. Our intelligent system learns about your unique academic journey.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-8">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  2
                </div>
                <div className="flex-1 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Get Personalized Matches</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Receive curated opportunities that align with your profile - from Masters and PhD programs to research positions and faculty openings. Each match includes compatibility scores and detailed insights.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-8">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  3
                </div>
                <div className="flex-1 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Prepare with Confidence</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Access tailored preparation resources, practice materials, and expert guidance specific to your target opportunities. Get ready for applications, interviews, and assessments with our comprehensive support.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-8">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  4
                </div>
                <div className="flex-1 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Track & Improve</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Monitor your application progress, receive outcome feedback, and continuously refine your profile. Learn from each experience to improve your success rate and advance your academic career.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Navigate Your Academic Future?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of students and researchers who have found their perfect academic path with Compass
          </p>
          <button className="bg-white text-blue-600 px-10 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-200 shadow-xl hover:shadow-2xl inline-flex items-center group">
            Start Your Journey Today
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold">Compass</span>
              </div>
              <p className="text-gray-400">
                Navigate your academic career with confidence and find opportunities that match your aspirations.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <div className="space-y-2 text-gray-400">
                <p>How it Works</p>
                <p>Features</p>
                <p>Pricing</p>
                <p>Success Stories</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-gray-400">
                <p>Help Center</p>
                <p>Contact Us</p>
                <p>Privacy Policy</p>
                <p>Terms of Service</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Opportunities</h4>
              <div className="space-y-2 text-gray-400">
                <p>Masters Programs</p>
                <p>PhD Positions</p>
                <p>Research Roles</p>
                <p>Faculty Positions</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Compass. All rights reserved. Navigate your academic future with confidence.</p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
