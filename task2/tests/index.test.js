const { login, register } = require('../helpers/supabase');

test('Login with valid Username and Password', async () => {
    const result = await login('me@aravin.net', 'aravind');
    expect(result).toBeInstanceOf(Array);
    expect(result[0]).toBe(true);
    expect(result[1]).toMatch(/^e/);
});

test('Login with invalid Username and Password', async () => {
    const result = await login('me@aravin.net', 'aravind001');
    expect(result).toBeInstanceOf(Array);
    expect(result[0]).toBe(false);
    expect(result[1]).not.toMatch(/^e/);
});

test('Login without Username', async () => {
    const result = await login(undefined, 'aravind001');
    expect(result).toBeInstanceOf(Array);
    expect(result[0]).toBe(false);
    expect(result[1]).toMatch('Email Address is Required');
});

test('Login without Password', async () => {
    const result = await login('me@aravin.net', undefined);
    expect(result).toBeInstanceOf(Array);
    expect(result[0]).toBe(false);
    expect(result[1]).toMatch('Password is Required');
});

test('Login without Username and Password', async () => {
    const result = await login(undefined, undefined);
    expect(result).toBeInstanceOf(Array);
    expect(result[0]).toBe(false);
    expect(result[1]).toMatch('Email Address is Required');
});


// Registration Tests
const emailId = Date.now().toString() + '@aravin.net';
test('Resgistration with valid Username and Password', async () => {
    const result = await register(emailId, 'aravind');
    expect(result).toBeInstanceOf(Array);
    expect(result[0]).toBe(true);
    expect(result[1]).toMatch(/^e/);
});

test('Resgistration with existing Username and Password', async () => {
    const result = await register(emailId, 'aravind001');
    expect(result).toBeInstanceOf(Array);
    expect(result[0]).toBe(false);
    expect(result[1]).not.toMatch(/^e/);
    expect(result[1]).toMatch('A user with this email address has already been registered');
});

test('Resgistration without Username', async () => {
    const result = await login(undefined, 'aravind001');
    expect(result).toBeInstanceOf(Array);
    expect(result[0]).toBe(false);
    expect(result[1]).toMatch('Email Address is Required');
});

test('Resgistration without Password', async () => {
    const result = await login('me@aravin.net', undefined);
    expect(result).toBeInstanceOf(Array);
    expect(result[0]).toBe(false);
    expect(result[1]).toMatch('Password is Required');
});

test('Resgistration without Username and Password', async () => {
    const result = await login(undefined, undefined);
    expect(result).toBeInstanceOf(Array);
    expect(result[0]).toBe(false);
    expect(result[1]).toMatch('Email Address is Required');
});
