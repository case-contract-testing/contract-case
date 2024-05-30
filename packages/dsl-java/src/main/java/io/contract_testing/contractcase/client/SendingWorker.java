package io.contract_testing.contractcase.client;

import io.grpc.stub.StreamObserver;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingQueue;

class SendingWorker<T> implements Runnable {

  private final BlockingQueue<SendTask<T>> queue;
  private final StreamObserver<T> requestObserver;
  private final ExecutorService executorService;

  SendingWorker(StreamObserver<T> requestObserver) {
    this.queue = new LinkedBlockingQueue<>();
    this.requestObserver = requestObserver;
    executorService = Executors.newSingleThreadExecutor();
    executorService.submit(this);
  }

  void send(T data) {
    try {
      queue.put(new SendTask<T>(TaskType.SEND_DATA, data));
    } catch (InterruptedException e) {
      throw new RuntimeException("Interrupted while sending: " + e.getMessage(), e);
    }
  }

  public void run() {
    while (true) {
      try {
        var task = queue.take();
        switch (task.type) {
          case SEND_DATA -> {
            MaintainerLog.log(" -> Sending: " + task.data);
            requestObserver.onNext(task.data);
          }
          case CLOSE -> {
            requestObserver.onCompleted();
            executorService.shutdown();
            return;
          }
        }
      } catch (InterruptedException e) {
        System.err.println("SendingWorker interrupted while waiting for messages");
      }
    }
  }

  void close() {
    try {
      this.queue.put(new SendTask<T>(TaskType.CLOSE, null));
    } catch (InterruptedException e) {
      throw new RuntimeException("SendingWorker interrupted while closing", e);
    }
  }

  private record SendTask<T>(TaskType type, T data) {

  }

  private enum TaskType {
    SEND_DATA,
    CLOSE
  }
}
