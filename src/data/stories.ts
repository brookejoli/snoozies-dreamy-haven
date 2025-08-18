export type Story = {
  slug: string
  title: string
  summary: string
  body?: string
}

export const stories: Story[] = [
  {
    slug: 'the-sleepy-forest-friends',
    title: 'The Sleepy Forest Friends',
    summary: 'Benny the Bear and Luna the Rabbit discover the secret to peaceful sleep in the enchanted forest.',
    body: `<p>Full story text for "The Sleepy Forest Friends" goes here…</p>`
  },
  {
    slug: 'the-dreamy-cloud-ride',
    title: 'The Dreamy Cloud Ride',
    summary: 'Fly through the starry night sky on a magical cloud with Oliver and his cat Whiskers.',
    body: `<p>Full story text for "The Dreamy Cloud Ride" goes here…</p>`
  },
  {
    slug: 'the-sleepy-garden-of-dreams',
    title: 'The Sleepy Garden of Dreams',
    summary: 'Luna and Whiskers wander through a magical garden that comes alive at night, helping them drift into dreams.',
    body: `<p>Full story text for "The Sleepy Garden of Dreams" goes here…</p>`
  },
  {
    slug: 'the-cozy-pet-library',
    title: 'The Cozy Pet Library',
    summary: 'Emma and Cocoa the dog discover a library filled with books that whisper sleepy tales.',
    body: `<p>Full story text for "The Cozy Pet Library" goes here…</p>`
  },
  {
    slug: 'the-sleepy-veterinary-village',
    title: 'The Sleepy Veterinary Village',
    summary: 'Dr. Mila and Sage the cat walk through a village where every pet finds peace at bedtime.',
    body: `<p>Full story text for "The Sleepy Veterinary Village" goes here…</p>`
  },
  {
    slug: 'the-moonlight-pet-parade',
    title: 'The Moonlight Pet Parade',
    summary: 'Oliver and Buster lead a gentle nighttime parade of pets under the moonlight.',
    body: `<p>Full story text for "The Moonlight Pet Parade" goes here…</p>`
  },
  {
    slug: 'the-sleepy-pet-cafe',
    title: 'The Sleepy Pet Café',
    summary: 'Maya and Buttercup the bunny discover a cozy café where pets and people share sleepy dreams together.',
    body: `<p>Full story text for "The Sleepy Pet Café" goes here…</p>`
  }
]
