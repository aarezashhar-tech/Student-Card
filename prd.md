# Product Requirements Document

## Project Name

Student Card System

## Objective

To create a React application that displays student details using reusable components.

## Problem Statement

Displaying multiple students by writing the same code repeatedly is inefficient.

A reusable component can eliminate duplicate code.

## Users

- Students
- Teachers
- College Administrators

## Functional Requirements

### Student Details

The system should display:

- Student Name
- Roll Number
- Department
- CGPA

### Student Card

Each student should appear inside a separate card.

### Dynamic Rendering

Student data should come from an array and be displayed automatically using map().

## Non-Functional Requirements

- Easy to use
- Responsive layout
- Clean UI
- Fast loading

## Success Criteria

- Multiple students displayed
- StudentCard component reused
- Data passed through props