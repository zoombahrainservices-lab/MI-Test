-- Add Comprehensive Multiple Intelligence Questions to Database
-- Run this script in your Supabase SQL Editor

-- Clear existing questions first
DELETE FROM questions WHERE id > 0;

-- Insert comprehensive MI questions
INSERT INTO questions (text, category, difficulty, options) VALUES

-- Logical-Mathematical Intelligence
('I like to step back and study a situation before I get directly involved.', 'logical', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I gather facts and examine them carefully to reach sound conclusions.', 'logical', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I enjoy solving challenging problems that require deep thought and research.', 'logical', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I prefer to hold back my opinions until I''ve thoroughly checked the details.', 'logical', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I appreciate depth, precision, and complexity in the subjects I care about.', 'logical', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I can remain objective when evaluating problems or situations.', 'logical', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I often search for hidden rules or patterns that explain how things work.', 'logical', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),

-- Linguistic-Verbal Intelligence
('Recognition for my ideas and contributions matters to me.', 'linguistic', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I actively welcome constructive feedback to sharpen and improve my work.', 'linguistic', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),

-- Interpersonal Intelligence
('I can easily sense when someone needs care, support, or encouragement.', 'interpersonal', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I often step in to help others without expecting anything in return.', 'interpersonal', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('Making sure people feel valued and cared for is important in my relationships.', 'interpersonal', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I naturally build and maintain strong, close connections with others.', 'interpersonal', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I often put other people''s needs ahead of my own.', 'interpersonal', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I''m comfortable showing affection and expressing care toward people I value.', 'interpersonal', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('My happiness is closely tied to the well-being of those around me.', 'interpersonal', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('People often approach me to talk about their feelings or seek advice.', 'interpersonal', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('Helping others gives me a sense of meaning and fulfillment.', 'interpersonal', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I look for opportunities to support or encourage people whenever I can.', 'interpersonal', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('It matters to me that others see me as kind and dependable.', 'interpersonal', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I tend to offer help before someone even asks for it.', 'interpersonal', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('My mood is often influenced by the emotional states of those around me.', 'interpersonal', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),

-- Intrapersonal Intelligence
('I''m always looking for ways to be more efficient and effective.', 'intrapersonal', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('Recognition from my peers motivates me to keep striving for success.', 'intrapersonal', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I set fresh goals once I achieve the ones I''ve been working toward.', 'intrapersonal', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I adjust my approach if it helps me reach my goals faster or better.', 'intrapersonal', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('Achieving goals is central to how I define success for myself.', 'intrapersonal', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I am highly driven by ambition and personal achievement.', 'intrapersonal', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I feel proud when my accomplishments are acknowledged.', 'intrapersonal', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('Having privacy and time alone to reflect is important for me.', 'intrapersonal', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I''m more interested in ideas and concepts than in social activities.', 'intrapersonal', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),

-- Visual-Spatial Intelligence
('My creativity is often inspired by how I feel emotionally.', 'spatial', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I like to show my individuality through my work and creative efforts.', 'spatial', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I''m drawn to beauty and design, and I surround myself with things that inspire me.', 'spatial', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I feel most alive when I''m creating something new and original.', 'spatial', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('My style or creative expression reflects who I truly am.', 'spatial', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I often notice creative details or inspiration in places others overlook.', 'spatial', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I trust my creative instincts and feel confident in my artistic abilities.', 'spatial', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I seek feedback on my creative work to make it even better.', 'spatial', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),

-- Bodily-Kinesthetic Intelligence
('I can adapt quickly and perform well in many different tasks or roles.', 'bodily', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('Even routine tasks feel engaging when I find creative ways to approach them.', 'bodily', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I can think and respond effectively in the moment when unexpected things happen.', 'bodily', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),

-- Musical-Rhythmic Intelligence
('I often notice rhythm, tone, or melody in everyday sounds.', 'musical', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('Music or rhythm helps me concentrate, remember things, or spark new ideas.', 'musical', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I enjoy expressing myself or organizing my work with a sense of flow or beat.', 'musical', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),

-- Naturalistic Intelligence
('I notice patterns and details in the environment that others often miss.', 'naturalist', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I feel energized when working with nature, natural materials, or living systems.', 'naturalist', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I can easily classify or organize things based on their natural qualities.', 'naturalist', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),

-- Conscientiousness / Detail Orientation (mapped to logical)
('I can be critical of myself or others when I spot mistakes.', 'logical', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('Double-checking details before finishing a task is important to me.', 'logical', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I look for ways to make systems or methods more effective.', 'logical', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('When I receive feedback, I focus on the details to know how to improve.', 'logical', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I like my work environment organized, with everything in its place.', 'logical', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I feel responsible for correcting errors so the end result is accurate.', 'logical', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('People often rely on me to notice and fix small mistakes.', 'logical', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),

-- Leadership / Assertiveness (mapped to interpersonal)
('I naturally step forward to guide others and make decisions.', 'interpersonal', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I speak my mind clearly and take a stand for my opinions.', 'interpersonal', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('Standing up for people I care about matters as much as standing up for myself.', 'interpersonal', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I''m comfortable facing conflict directly when necessary.', 'interpersonal', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('In group settings, I often take on a leadership role without being asked.', 'interpersonal', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I feel compelled to act when I see something unfair or unjust.', 'interpersonal', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I respect strong individuals and enjoy working alongside them.', 'interpersonal', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I like relying on my own abilities and being self-sufficient.', 'intrapersonal', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I''m comfortable using authority or influence to bring about positive change.', 'interpersonal', 'medium', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]');

-- Show summary
SELECT 
    category,
    COUNT(*) as question_count
FROM questions 
GROUP BY category 
ORDER BY question_count DESC;
