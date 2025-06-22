package io.contract_testing.contractcase.configuration;

public class InvokableFunctions {

  @FunctionalInterface
  public interface InvokableFunction0<E extends Exception> {

    String apply() throws E;
  }

  @FunctionalInterface
  public interface InvokableFunction1<E extends Exception> {

    String apply(String a) throws E;
  }

  @FunctionalInterface
  public interface InvokableFunction2<E extends Exception> {

    String apply(String a, String b) throws E;
  }

  @FunctionalInterface
  public interface InvokableFunction3<E extends Exception> {

    String apply(String a, String b, String c) throws E;
  }

  @FunctionalInterface
  public interface InvokableFunction4<E extends Exception> {

    String apply(String a, String b, String c, String d) throws E;
  }

  @FunctionalInterface
  public interface InvokableFunction5<E extends Exception> {

    String apply(String a, String b, String c, String d, String e) throws E;
  }

  @FunctionalInterface
  public interface InvokableFunction6<E extends Exception> {

    String apply(String a, String b, String c, String d, String e, String f)
        throws E;
  }

  @FunctionalInterface
  public interface InvokableFunction7<E extends Exception> {

    String apply(String a,
        String b,
        String c,
        String d,
        String e,
        String f,
        String g) throws E;
  }
}
