import Immutable from 'immutable';

const Podcast = Immutable.Record({
  description_original: String,
  publisher_highlighted: String,
  lastest_pub_date_ms: Number,
  description_highlighted: String,
  rss: String,
  thumbnail: String,
  image: String,
  publisher_original: String,
  listennotes_url: String,
  title_highlighted: String,
  genres: Array,
  title_original: String,
  id: String,
  itunes_id: Number,
});

export default Podcast;