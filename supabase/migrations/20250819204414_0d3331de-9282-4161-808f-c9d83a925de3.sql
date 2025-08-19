-- Insert sample story data into the database
INSERT INTO public.stories (slug, title, summary, excerpt, body, full_text, thumbnail_url, audio_url, youtube_id, duration, tags, published_at) VALUES

-- Story 1: The Sleepy Forest Friends (from JSON)
('the-sleepy-forest-friends', 
 'The Sleepy Forest Friends', 
 'Benny the Bear and Luna the Rabbit discover the secret to peaceful sleep in the enchanted forest.',
 'Join Benny the Bear and Luna the Rabbit as they discover the secret to peaceful sleep in the enchanted forest.',
 '<p>Once upon a time in a quiet forest, Benny the Bear and Luna the Rabbit loved to explore the woods during the day but often had trouble falling asleep at night.</p><p>One evening, they decided to visit Grandmother Owl, the wisest creature in the forest, to ask for advice.</p><p>Grandmother Owl taught them a simple secret: breathe deeply, think of happy moments, and listen to the soothing sounds of the forest.</p><p>That night, Benny and Luna followed her advice, breathing slowly and remembering their favorite parts of the day. Soon, the stars above twinkled brighter, and they drifted into the most peaceful sleep.</p><p>From then on, every night was calm and dreamy in the enchanted forest.</p>',
 'Once upon a time in a quiet forest, Benny the Bear and Luna the Rabbit loved to explore the woods during the day but often had trouble falling asleep at night.

One evening, they decided to visit Grandmother Owl, the wisest creature in the forest, to ask for advice.

Grandmother Owl taught them a simple secret: breathe deeply, think of happy moments, and listen to the soothing sounds of the forest.

That night, Benny and Luna followed her advice, breathing slowly and remembering their favorite parts of the day. Soon, the stars above twinkled brighter, and they drifted into the most peaceful sleep.

From then on, every night was calm and dreamy in the enchanted forest.',
 '/images/the-sleepy-forest-friends.png',
 '/audio/the-sleepy-forest-friends.mp3',
 'dQw4w9WgXcQ',
 '12:30',
 ARRAY['forest', 'animals', 'sleepy'],
 '2025-08-05 00:00:00+00'::timestamptz),

-- Story 2: The Dreamy Cloud Ride (from JSON)
('the-dreamy-cloud-ride',
 'The Dreamy Cloud Ride',
 'Fly through the starry night sky on a magical cloud with Oliver and his cat Whiskers.',
 'Fly through the starry night sky on a magical cloud with Oliver and his cat Whiskers.',
 '<p>Oliver loved watching the stars from his window each night, but he always dreamed of touching the clouds. One night, as he drifted to sleep, a soft glowing cloud floated by and invited him aboard.</p><p>With his cat Whiskers curled beside him, Oliver soared high above the rooftops, gliding through the moonlight. They passed twinkling stars, quiet villages, and shimmering lakes reflecting the night sky.</p><p>The cloud carried them gently until the first hint of sunrise appeared. As dawn broke, Oliver and Whiskers returned to his bed, smiling in their sleep, ready for another magical journey the next night.</p>',
 'Oliver loved watching the stars from his window each night, but he always dreamed of touching the clouds. One night, as he drifted to sleep, a soft glowing cloud floated by and invited him aboard.

With his cat Whiskers curled beside him, Oliver soared high above the rooftops, gliding through the moonlight. They passed twinkling stars, quiet villages, and shimmering lakes reflecting the night sky.

The cloud carried them gently until the first hint of sunrise appeared. As dawn broke, Oliver and Whiskers returned to his bed, smiling in their sleep, ready for another magical journey the next night.',
 '/images/the-dreamy-cloud-ride.png',
 '/audio/the-dreamy-cloud-ride.mp3',
 'Z1LmpiIGYNs',
 '10:45',
 ARRAY['clouds', 'night sky', 'magical'],
 '2025-08-03 00:00:00+00'::timestamptz),

-- Story 3: The Sleepy Garden of Dreams (from TS file)
('the-sleepy-garden-of-dreams',
 'The Sleepy Garden of Dreams',
 'Luna and Whiskers wander through a magical garden that comes alive at night, helping them drift into dreams.',
 'Luna and Whiskers wander through a magical garden that comes alive at night, helping them drift into dreams.',
 '<p>In a secret garden hidden behind Luna''s house, something magical happened every night when the moon rose high. The flowers would glow softly, and the trees would hum gentle lullabies.</p><p>One evening, Luna and her cat Whiskers discovered this enchanted place. As they walked through the garden paths, lavender petals floated around them, filling the air with calming scents.</p><p>The garden''s magic helped Luna feel peaceful and sleepy. She lay down on a bed of soft moss while Whiskers curled up beside her, and they both drifted into the most wonderful dreams.</p>',
 NULL,
 NULL,
 NULL,
 NULL,
 '8:20',
 ARRAY['garden', 'dreams', 'magical', 'peaceful'],
 '2025-08-01 00:00:00+00'::timestamptz),

-- Story 4: The Cozy Pet Library
('the-cozy-pet-library',
 'The Cozy Pet Library',
 'Emma and Cocoa the dog discover a library filled with books that whisper sleepy tales.',
 'Emma and Cocoa the dog discover a library filled with books that whisper sleepy tales.',
 '<p>Emma loved visiting the library with her golden retriever Cocoa, but one evening they discovered something extraordinary. Hidden behind a bookshelf was a special room where the books themselves told stories aloud in gentle whispers.</p><p>As Emma and Cocoa settled into a cozy reading nook, the books began sharing tales of sleepy adventures. Stories of yawning dragons, drowsy fairies, and peaceful kingdoms filled the air.</p><p>The magical library''s whispered stories made Emma''s eyelids heavy, and she fell asleep surrounded by the gentle voices of a thousand bedtime tales.</p>',
 NULL,
 NULL,
 NULL,
 NULL,
 '9:15',
 ARRAY['library', 'books', 'pets', 'stories'],
 '2025-07-30 00:00:00+00'::timestamptz),

-- Story 5: The Sleepy Veterinary Village
('the-sleepy-veterinary-village',
 'The Sleepy Veterinary Village',
 'Dr. Mila and Sage the cat walk through a village where every pet finds peace at bedtime.',
 'Dr. Mila and Sage the cat walk through a village where every pet finds peace at bedtime.',
 '<p>Dr. Mila was the kindest veterinarian in the village, and her cat Sage always accompanied her on evening rounds. In this special village, every pet had their own bedtime routine to help them sleep peacefully.</p><p>They visited sleepy puppies who listened to lullabies, tired kittens who curled up in warm baskets, and gentle horses who watched the stars from their stable windows.</p><p>As Dr. Mila and Sage finished their rounds, they too felt the village''s peaceful magic working its spell, making them ready for their own cozy night''s sleep.</p>',
 NULL,
 NULL,
 NULL,
 NULL,
 '11:00',
 ARRAY['veterinary', 'village', 'pets', 'bedtime'],
 '2025-07-28 00:00:00+00'::timestamptz),

-- Story 6: The Moonlight Pet Parade
('the-moonlight-pet-parade',
 'The Moonlight Pet Parade',
 'Oliver and Buster lead a gentle nighttime parade of pets under the moonlight.',
 'Oliver and Buster lead a gentle nighttime parade of pets under the moonlight.',
 '<p>Every full moon, something wonderful happened in Oliver''s neighborhood. All the pets would gather for a gentle parade through the quiet streets, led by Oliver and his faithful dog Buster.</p><p>Cats padded silently on soft paws, dogs wagged their tails in sleepy contentment, and even the neighborhood rabbits hopped along peacefully. The moonlight made everything glow with a silvery, dreamy light.</p><p>After the parade, all the pets returned to their homes feeling calm and ready for sleep, having shared in the magical moonlit adventure together.</p>',
 NULL,
 NULL,
 NULL,
 NULL,
 '7:30',
 ARRAY['moonlight', 'parade', 'pets', 'neighborhood'],
 '2025-07-26 00:00:00+00'::timestamptz),

-- Story 7: The Sleepy Pet Café
('the-sleepy-pet-cafe',
 'The Sleepy Pet Café',
 'Maya and Buttercup the bunny discover a cozy café where pets and people share sleepy dreams together.',
 'Maya and Buttercup the bunny discover a cozy café where pets and people share sleepy dreams together.',
 '<p>Maya and her pet bunny Buttercup discovered the most wonderful café at the end of their street. Unlike regular cafés, this one served warm milk in tiny saucers and had the coziest cushions for afternoon naps.</p><p>In this magical café, pets and their people could share the same dreams. As Maya sipped her warm cocoa and Buttercup nibbled on sweet clover, they both began to yawn at the same time.</p><p>Soon, Maya and Buttercup were fast asleep in the café''s embrace, dreaming the same beautiful dream of endless fields of soft grass and gentle sunshine.</p>',
 NULL,
 NULL,
 NULL,
 NULL,
 '6:45',
 ARRAY['café', 'dreams', 'pets', 'cozy'],
 '2025-07-24 00:00:00+00'::timestamptz);