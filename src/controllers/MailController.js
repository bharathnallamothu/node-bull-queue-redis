import MailQueue from '../lib/Queue';

export default {
    async store(request, response) {
        const { to, from, subject, text } = request.body;
        try {
            const job = await MailQueue.add({
                to,
                from,
                subject,
                text
            });
            response.status(200).send(job);
        } catch (e) {
            console.log('error')
            console.log(e)
            response.status(500).send(e);
        }
    }
}
