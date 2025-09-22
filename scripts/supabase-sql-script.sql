-- Supabase SQL Script to Add 100 Shuffled Questions
-- Run this script in your Supabase Dashboard → SQL Editor

-- Step 1: Clear all existing questions
DELETE FROM questions;

-- Step 2: Reset the sequence (if using auto-increment)
-- ALTER SEQUENCE questions_id_seq RESTART WITH 1;

-- Step 3: Insert all 100 questions in shuffled order
-- (Questions are pre-shuffled to ensure random order)

INSERT INTO questions (id, text, category, difficulty, options, is_active) VALUES
(1, 'I naturally sense when someone needs emotional support', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(2, 'I can become critical of myself or others when mistakes are made', 'Logical-Mathematical', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(3, 'I am drawn to aesthetics and surround myself with beauty that inspires me', 'Musical & Creative', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(4, 'I often put the needs of others before my own', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(5, 'I am optimistic and can usually find the silver lining in difficult situations', 'Intrapersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(6, 'I embrace change and adapt easily to new situations', 'Bodily-Kinesthetic', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(7, 'I enjoy solving complex problems with thorough analysis and research', 'Logical-Mathematical', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(8, 'I am comfortable expressing affection and care towards others', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(9, 'I can easily visualize objects in 3D', 'Spatial', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(10, 'I am driven by my ambition and the desire to be successful', 'Intrapersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(11, 'I actively seek feedback to refine and enhance my creative projects', 'Musical & Creative', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(12, 'I often seek advice or reassurance from others before proceeding', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(13, 'I am skilled at thinking on my feet and making the best of unexpected changes', 'Bodily-Kinesthetic', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(14, 'I value depth and complexity in my areas of interest or expertise', 'Logical-Mathematical', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(15, 'I am comfortable with power and using it to effect change', 'Intrapersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(16, 'I work to ensure that everyone feels heard and included in discussions', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(17, 'I enjoy expressing my ideas clearly in writing or speech', 'Linguistic', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(18, 'I quickly become bored with the status quo and look for ways to innovate', 'Musical & Creative', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(19, 'I am vigilant about potential risks and always plan for contingencies', 'Intrapersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(20, 'I am good at helping others find common ground and compromise', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(21, 'I prefer to keep my options open rather than commit to one course of action', 'Bodily-Kinesthetic', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(22, 'I can be detached when analyzing situations or problems', 'Logical-Mathematical', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(23, 'I am self-reliant and prefer to depend on my own abilities', 'Intrapersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(24, 'I often go with the flow to avoid rocking the boat', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(25, 'I can mentally rotate and manipulate 3D objects to solve spatial problems', 'Spatial', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(26, 'I feel most alive when I am creating something new and original', 'Musical & Creative', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(27, 'I seek security and stability in my environment and relationships', 'Intrapersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(28, 'I am willing to compromise my own preferences for the sake of group harmony', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(29, 'I often seek out new and exciting experiences to keep life interesting', 'Bodily-Kinesthetic', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(30, 'I collect and analyze data to make informed decisions', 'Logical-Mathematical', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(31, 'I enjoy being recognized for my accomplishments', 'Intrapersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(32, 'I believe maintaining a relationship is more important than winning an argument', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(33, 'I pay attention to the words I use to ensure they are accurate', 'Linguistic', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(34, 'I need to express my individuality in my work or artistic endeavors', 'Musical & Creative', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(35, 'I sometimes hesitate to take action due to fear of making the wrong choice', 'Intrapersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(36, 'I approach disagreements with the goal of finding a solution that satisfies everyone', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(37, 'Planning too far ahead feels restrictive to me; I prefer spontaneity', 'Bodily-Kinesthetic', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(38, 'I often look for underlying principles or patterns to understand how things work', 'Logical-Mathematical', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(39, 'I naturally take on leadership roles in group settings', 'Intrapersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(40, 'It''s important for me that conflicts are resolved amicably and without resentment', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(41, 'I can mentally manipulate complex 3D structures and predict how they would behave under various conditions', 'Spatial', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(42, 'My creativity is often sparked by my emotional experiences', 'Musical & Creative', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(43, 'I prefer clear guidelines and expectations to feel secure in my role', 'Intrapersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(44, 'I sometimes downplay my own needs to keep peace in my relationships', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(45, 'I am adaptable and excel in a variety of tasks and roles', 'Bodily-Kinesthetic', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(46, 'Before making decisions, I consider all the possible outcomes and risks', 'Logical-Mathematical', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(47, 'I am assertive in expressing my opinions and taking a stand', 'Intrapersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(48, 'I actively look for ways to support and encourage others', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(49, 'I am motivated to persuade or inspire others through language', 'Linguistic', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(50, 'I often find creative inspiration in places others might overlook', 'Musical & Creative', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(51, 'I value predictability and routine as they provide a sense of stability', 'Intrapersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(52, 'I am often the peacemaker in my group of friends or at work', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(53, 'I am skilled at adapting my actions to achieve practical results', 'Bodily-Kinesthetic', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(54, 'I am cautious about sharing my insights until I have fully examined an issue', 'Logical-Mathematical', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(55, 'I am not afraid of confrontation and will face conflicts head-on', 'Intrapersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(56, 'It''s important to me that others see me as helpful and kind', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(57, 'I enjoy reading or learning new ways to communicate effectively', 'Linguistic', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(58, 'I am confident in my creative abilities and trust my unique vision', 'Musical & Creative', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(59, 'I am more interested in ideas and concepts than in social interaction', 'Intrapersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(60, 'I prefer to listen and understand all viewpoints before expressing my own', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(61, 'I feel comfortable learning by doing rather than only observing', 'Bodily-Kinesthetic', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(62, 'I prefer to observe and analyze before getting involved in a situation', 'Logical-Mathematical', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(63, 'I respect strength in others and am drawn to people who are also assertive', 'Intrapersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(64, 'I often offer help before being asked', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(65, 'I can become critical of myself or others when mistakes are made', 'Logical-Mathematical', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(66, 'My personal style is a true reflection of my unique identity', 'Musical & Creative', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(67, 'Privacy and time alone to think are essential to me', 'Intrapersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(68, 'I find it challenging to make decisions when there is a potential for conflict', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(69, 'I often use physical activity to think through ideas or problems', 'Bodily-Kinesthetic', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(70, 'Ensuring that every detail is correct before completing a task is important to me', 'Logical-Mathematical', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(71, 'I take charge of situations and am confident in making decisions', 'Intrapersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(72, 'My own mood is affected by the emotional states of those around me', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(73, 'I often find ways to improve methods that are already considered efficient', 'Logical-Mathematical', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(74, 'Routine tasks are an opportunity for me to find creative ways to engage', 'Musical & Creative', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(75, 'I am loyal and committed, especially to those I trust', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(76, 'I am often the person who others rely on to find and fix mistakes', 'Logical-Mathematical', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(77, 'I constantly look for ways to improve my efficiency and productivity', 'Logical-Mathematical', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(78, 'I adapt my approach if it means accomplishing a goal more effectively', 'Logical-Mathematical', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(79, 'I take active steps to help others without expecting anything in return', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(80, 'Making sure others feel cared for is a priority in my relationships', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(81, 'I find it easy to build and maintain close, personal relationships', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(82, 'I am comfortable expressing affection and care towards others', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(83, 'My happiness is closely linked to the well-being of the people I care about', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(84, 'I am often approached by people who seek comfort or advice', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(85, 'Helping others makes me feel valued and fulfilled', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(86, 'I often seek advice or reassurance from others before proceeding', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(87, 'I am loyal and committed, especially to those I trust', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(88, 'I strive to maintain harmony in my relationships and environment', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(89, 'I often see multiple sides of an issue and try to mediate disagreements', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(90, 'Avoiding tension and conflict is often more comfortable for me than addressing problems', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(91, 'I work to ensure that everyone feels heard and included in discussions', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(92, 'I am good at helping others find common ground and compromise', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(93, 'Peaceful resolutions are more important to me than winning an argument', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(94, 'I am often the peacemaker in my group of friends or at work', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(95, 'I prefer to listen and understand all viewpoints before expressing my own', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(96, 'I find it challenging to make decisions when there is a potential for conflict', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(97, 'I often go with the flow to avoid rocking the boat', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(98, 'I am willing to compromise my own preferences for the sake of group harmony', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(99, 'It''s important for me that conflicts are resolved amicably and without resentment', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true),
(100, 'I sometimes downplay my own needs to keep peace in my relationships', 'Interpersonal', 'easy', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]', true);

-- Step 4: Verify the questions were added
SELECT COUNT(*) as total_questions FROM questions;

-- Step 5: Show question distribution by category
SELECT category, COUNT(*) as question_count 
FROM questions 
GROUP BY category 
ORDER BY question_count DESC;

-- Step 6: Show first 10 questions to verify shuffling
SELECT id, category, LEFT(text, 60) as question_preview 
FROM questions 
ORDER BY id 
LIMIT 10;
