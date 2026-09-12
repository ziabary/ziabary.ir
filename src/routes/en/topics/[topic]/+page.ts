import { topicEntries, loadTopic } from '$lib/topic-pages';
export const entries = () => topicEntries('en');
export const load = ({ params }: { params: { topic: string } }) => loadTopic('en', params.topic);
