package io.contract_testing.contractcase;

public class InvokableFunctions {

  @FunctionalInterface
  public interface InvokableFunction0 {

    String apply();
  }

  @FunctionalInterface
  public interface InvokableFunction1 {

    String apply(String a);
  }

  @FunctionalInterface
  public interface InvokableFunction2 {

    String apply(String a, String b);
  }

  @FunctionalInterface
  public interface InvokableFunction3 {

    String apply(String a, String b, String c);
  }

  @FunctionalInterface
  public interface InvokableFunction4 {

    String apply(String a, String b, String c, String d);
  }

  @FunctionalInterface
  public interface InvokableFunction5 {

    String apply(String a, String b, String c, String d, String e);
  }

  @FunctionalInterface
  public interface InvokableFunction6 {

    String apply(String a, String b, String c, String d, String e, String f);
  }

  @FunctionalInterface
  public interface InvokableFunction7 {

    String apply(String a, String b, String c, String d, String e, String f, String g);
  }
}
