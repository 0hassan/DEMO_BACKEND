const Queue = require("bull");
const auth0lib = require("../utils/auth0lib");
const auth0utils = require("../utils/auth0utils");

const { ExpressAdapter } = require("@bull-board/express");
const { createBullBoard } = require("@bull-board/api");
const { BullAdapter } = require("@bull-board/api/bullAdapter");

// queue witch handles create new user on Auth0
const createUserOnAuth0Queue = new Queue("createUserOnAuth0", {
  redis: { host: "localhost", port: 6379 },
});
// example queue.
const someOtherQueue = new Queue("someOtherQueueName");

// to delete user on auth0
const deleteUserOnAuth0Queue = new Queue("deleteUserOnAuth0", {
  redis: { host: "localhost", port: 6379 },
});

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [
    new BullAdapter(createUserOnAuth0Queue),
    new BullAdapter(deleteUserOnAuth0Queue),
    new BullAdapter(someOtherQueue),
  ],
  serverAdapter: serverAdapter,
});

createUserOnAuth0Queue.process(async (job, done) => {
  try {
    console.log("Creating user on Auth0...");
    console.log(job.data);
    let progress = 0;
    await auth0lib.createUser(job.data);
    progress = 50;
    job.progress(progress);
    await auth0utils.changePassword(job.data.email);
    progress = 100;
    job.progress(progress);
    return done();
  } catch (error) {
    console.log(error);
    done(error);
  }
});

createUserOnAuth0Queue.on("completed", (job, result) => {
  console.log("Job completed with result", result);
});

module.exports = {
  createUserOnAuth0Queue,
  deleteUserOnAuth0Queue,

  serverAdapter,
};
