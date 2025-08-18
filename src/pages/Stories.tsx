import { Link } from 'react-router-dom'
import { stories } from '../data/stories'

export default function Stories() {
  return (
    <section style={{ padding: '2rem' }}>
      <h1>All Stories</h1>
      <ul>
        {stories.map(story => (
          <li key={story.slug} style={{ marginBottom: '1rem' }}>
            <Link to={`/stories/${story.slug}`}>
              <strong>{story.title}</strong>
            </Link>
            <p>{story.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
