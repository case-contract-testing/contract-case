# Sketches on why this is here

An http contract test says:

1. When I call this client code
2. I send this request
3. When the server is in this state
4. I expect this response, and
5. I can unmarshall it into this object

An http contract verification says:

1. When I am in this state
2. And I receive this request
3. I can generate the response the contract is expecting

A message contract test says:

1. When I receive this response (message)
2. I unmarshall it into this object

(the request and server states are implied)

And a message contract verification says:

1. When I am in this state
2. I can generate the response (message) the contract is expecting

These should both be different cases of the same thing.
