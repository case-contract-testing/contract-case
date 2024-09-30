package io.contract_testing.contractcase.test.httpclient.implementation;

public class UserNotFoundException extends RuntimeException {

  public UserNotFoundException() {
    super("User not found");
  }
}
