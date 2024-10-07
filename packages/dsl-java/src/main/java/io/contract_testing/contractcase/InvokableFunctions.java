package io.contract_testing.contractcase;

public class InvokableFunctions {

  @FunctionalInterface
  public interface InvokableFunction0<R> {

    R apply();
  }

  @FunctionalInterface
  public interface InvokableFunction1<R, A> {

    R apply(A a);
  }

  @FunctionalInterface
  public interface InvokableFunction2<R, A, B> {

    R apply(A a, B b);
  }

  @FunctionalInterface
  public interface InvokableFunction3<R, A, B, C> {

    R apply(A a, B b, C c);
  }

  @FunctionalInterface
  public interface InvokableFunction5<R, A, B, C, D> {

    R apply(A a, B b, C c, D d);
  }
}
