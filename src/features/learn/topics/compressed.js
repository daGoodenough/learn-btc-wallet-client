const compressed = `
## Compressed VS Uncompressed
There are two ways to represent your public keys.

The first is "uncompressed" which is just the x value concatenated with the y value and prefixed by '04' resulting in a 520-bit number (130 hexadecimal characters).

The second is, you guessed it, "compressed". We know the equation of the curve our point is on, so if we have x we can solve for y. To solve the equation and find the y value we need to know x and whether y is positive or negative.

When you see these points in hexadecimal format, they are binary representations, so if y is a positive value, then the y value we see will be even and if y represents a negative value it will be odd.

Armed with this knowledge we can easily construct a compressed public key. We simply prefix the x value with an additional byte to signify the parity of y.

If y is even the prefix is '02', and '03' for odd.
`;

export default compressed;