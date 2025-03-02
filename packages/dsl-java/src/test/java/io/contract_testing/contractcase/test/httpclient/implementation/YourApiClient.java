package io.contract_testing.contractcase.test.httpclient.implementation;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import org.apache.http.client.fluent.Request;

public class YourApiClient {

  private final ObjectMapper mapper = new ObjectMapper();
  private final String baseUrl;

  public YourApiClient(String baseUrl) {
    this.baseUrl = baseUrl;
  }


  public String getHealth() throws IOException {
    return Request.Get(this.baseUrl + "/health")
        .addHeader("Accept", "application/json")
        .execute().handleResponse(httpResponse -> {
          try {
            if (httpResponse.getStatusLine().getStatusCode() >= 400) {
              throw new RuntimeException("The server is not ready");
            }

            return mapper.readValue(httpResponse.getEntity().getContent(), Health.class)
                .getStatus();
          } catch (JsonMappingException e) {
            throw new IOException(e);
          }
        });
  }

  public User getUser(String id) throws IOException {
    return Request.Get(this.baseUrl + "/users/" + id)
        .addHeader("Accept", "application/json")
        .execute().handleResponse(httpResponse -> {
          try {
            if (httpResponse.getStatusLine().getStatusCode() == 404) {
              throw new UserNotFoundException();
            }
            if (httpResponse.getStatusLine().getStatusCode() >= 500) {
              throw new RuntimeException("The server is not ready");
            }

            return mapper.readValue(httpResponse.getEntity().getContent(), User.class);
          } catch (JsonMappingException e) {
            throw new IOException(e);
          }
        });
  }

  public User getUserQuery(String id) throws IOException {
    return Request.Get(this.baseUrl + "/users?id=" + id)
        .addHeader("Accept", "application/json")
        .execute().handleResponse(httpResponse -> {
          try {
            if (httpResponse.getStatusLine().getStatusCode() >= 500) {
              throw new RuntimeException("The server is not ready");
            }
            if (httpResponse.getStatusLine().getStatusCode() == 404) {
              throw new UserNotFoundException();
            }

            return mapper.readValue(httpResponse.getEntity().getContent(), User.class);
          } catch (JsonMappingException e) {
            throw new IOException(e);
          }
        });
  }
}
