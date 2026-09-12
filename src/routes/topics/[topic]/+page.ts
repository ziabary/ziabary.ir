import { topicEntries, loadTopic } from '$lib/topic-pages';
export const entries = () => topicEntries('fa');
export const load = ({ params }: { params: { topic: string } }) => loadTopic('fa', params.topic);
