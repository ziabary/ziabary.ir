import { topicEntries, loadTopic } from '$lib/topic-pages';
export const entries = () => topicEntries('es');
export const load = ({ params }: { params: { topic: string } }) => loadTopic('es', params.topic);
