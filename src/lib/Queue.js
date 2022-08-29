import Queue from 'bull';
import redis from '../config/redis';


const mailQueue = new Queue('mail', 'redis://default:redispw@localhost:55000');
// const mailQueue = new Queue('mail', {
//     redis: { host: redis.host, port: redis.port }
// });

mailQueue.process(async function ({ data }, done) {
    console.log('data process started')
    // await Mail.sendMail({
    //     from: 'henri@henri.com.br',
    //     to: `${data.name} <${data.email}>`,
    //     subject: data.title,
    //     text: data.message
    // });

    done();
});

mailQueue.on('global:completed', jobId => {
    console.log(`<<<<<global Job with id ${jobId} has been completed/>///`);
})
mailQueue.on('error', function (error) {
    console.log('error')
    console.log(error)
    // An error occured.
})

mailQueue.on('waiting', function (jobId) {
    console.log('jobId')
    console.log(jobId)
    // A Job is waiting to be processed as soon as a worker is idling.
});

mailQueue.on('active', function (job, jobPromise) {
    console.log('job, in active')
    // console.log(job, jobPromise)
    // A job has started. You can use `jobPromise.cancel()`` to abort it.
})

mailQueue.on('stalled', function (job) {
    console.log('stalled job')
    // console.log(job)
    // A job has been marked as stalled. This is useful for debugging job
    // workers that crash or pause the event loop.
})

mailQueue.on('progress', function (job, progress) {
    console.log('job, progress')
    // console.log(job, progress)
    // A job's progress was updated!
})

mailQueue.on('completed', function (job, result) {
    console.log('job, completed')
    // console.log(job, result)
    // A job successfully completed with a `result`.
})

mailQueue.on('failed', function (job, err) {
    console.log('job, failed')
    console.log(job, err)
    // A job failed with reason `err`!
})

mailQueue.on('paused', function (jobId) {
    console.log('paused jobId')
    // console.log(jobId)
    // The queue has been paused.
})

mailQueue.on('resumed', function (job) {
    console.log('job resumed')
    // console.log(job)
    // The queue has been resumed.
})

mailQueue.on('cleaned', function (jobs, type) {
    console.log('jobs, cleaned')
    // console.log(jobs, type)
    // Old jobs have been cleaned from the queue. `jobs` is an array of cleaned
    // jobs, and `type` is the type of jobs cleaned.
});

mailQueue.on('drained', function (jodid) {
    console.log('jodid drained')
    // console.log(jodid)
    // Emitted every time the queue has processed all the waiting jobs (even if there can be some delayed jobs not yet processed)
});

mailQueue.on('removed', function (job) {
    console.log('job removed')
    // console.log(job)
    // A job successfully removed.
});

export default mailQueue;