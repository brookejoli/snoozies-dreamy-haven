-- Update stories to add missing thumbnail URLs
UPDATE stories 
SET thumbnail_url = '/images/the-sleepy-garden-of-dreams.png'
WHERE slug = 'the-sleepy-garden-of-dreams';

UPDATE stories 
SET thumbnail_url = '/images/the-cozy-pet-library.png'
WHERE slug = 'the-cozy-pet-library';

UPDATE stories 
SET thumbnail_url = '/images/the-sleepy-veterinary-village.png'
WHERE slug = 'the-sleepy-veterinary-village';

UPDATE stories 
SET thumbnail_url = '/images/the-moonlight-pet-parade.png'
WHERE slug = 'the-moonlight-pet-parade';

UPDATE stories 
SET thumbnail_url = '/images/the-sleepy-pet-cafe.png'
WHERE slug = 'the-sleepy-pet-cafe';