import { motion } from 'framer-motion';
import { 
  Shield, Key, UserCheck, AlertTriangle, CheckCircle,
  Terminal, Globe
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Chapter15() {
  return (
    <div className="space-y-8">
      <motion.div {...fadeIn} className="text-center space-y-4">
        <Badge variant="secondary" className="text-sm">Chapter 15</Badge>
        <h1 className="text-4xl font-bold text-gray-900">Security</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive coverage of security threats, cryptography, authentication, defenses, and real-world secure engineering practices
        </p>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card className="border-l-4 border-gray-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-gray-500" />
              The Security Problem and Program Threats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 p-5 rounded-lg">
              <p className="text-gray-800 text-lg leading-relaxed">
                A <strong>security breach</strong> occurs when a system or data is accessed, used, altered, or destroyed without authorization. Security violations can be accidental (human error, software bugs) or intentional (malicious attacks). The goal of computer security is to prevent unauthorized access, ensure confidentiality, maintain integrity, and guarantee availability.
              </p>
            </div>

            <div className="bg-gray-100 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">The CIA Triad</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded border-l-4 border-gray-400">
                  <p className="font-semibold text-gray-900">Confidentiality</p>
                  <p className="text-sm text-gray-700 mt-2">Ensuring that information is accessible only to those authorized to have access. Prevents unauthorized disclosure.</p>
                </div>
                <div className="bg-white p-4 rounded border-l-4 border-gray-400">
                  <p className="font-semibold text-gray-900">Integrity</p>
                  <p className="text-sm text-gray-700 mt-2">Safeguarding the accuracy and completeness of information and processing methods. Prevents unauthorized modification.</p>
                </div>
                <div className="bg-white p-4 rounded border-l-4 border-gray-400">
                  <p className="font-semibold text-gray-900">Availability</p>
                  <p className="text-sm text-gray-700 mt-2">Ensuring that authorized users have access to information and associated assets when required. Prevents denial of service.</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Program Threats</h4>
                <ul className="text-sm text-gray-700 space-y-3">
                  <li><strong>Trojan Horse:</strong> A program that appears useful but contains hidden malicious functionality. It exploits the user's privileges to perform unauthorized actions. Example: a game that secretly exfiltrates files.</li>
                  <li><strong>Trap Door (Backdoor):</strong> A secret entry point in a program that bypasses normal authentication. Often left by developers for debugging and later exploited by attackers.</li>
                  <li><strong>Logic Bomb:</strong> Code that lies dormant until a specific condition is met (date, event, or user action). Example: an employee's script that deletes a database if they are removed from the payroll system.</li>
                  <li><strong>Stack and Buffer Overflow:</strong> Writing beyond the bounds of a buffer to overwrite adjacent memory, including return addresses. This can inject and execute malicious shellcode.</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Virus Structure and Life Cycle</h4>
                <p className="text-sm text-gray-700 mb-2">
                  A <strong>virus</strong> is a fragment of code embedded in a legitimate program. It self-replicates by infecting other programs or files.
                </p>
                <div className="bg-gray-900 p-3 rounded text-xs text-gray-300 font-mono">
{`Virus Life Cycle:
1. Dormant phase: Virus idle, waiting for trigger
2. Propagation phase: Virus copies itself to other files
3. Triggering phase: Virus activated by event (date, action)
4. Execution phase: Virus performs its payload
   (delete files, corrupt data, open backdoor)`}
                </div>
                <p className="text-sm text-gray-700 mt-3">
                  Virus types include file infectors (attach to executables), boot-sector viruses (infect startup code), macro viruses (infect document macros), and polymorphic viruses (mutate to evade detection).
                </p>
              </div>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <h4 className="text-gray-400 text-sm mb-3">Stack Overflow Attack Anatomy</h4>
              <pre className="text-gray-300 text-xs font-mono">
{`
Normal Stack Frame:
  High Address
  +------------------+
  |   Parameters     |
  +------------------+
  |  Return Address  |  <-- points to caller
  +------------------+
  |  Saved Base Ptr  |
  +------------------+
  |  Local Variables |  <-- buffer[64]
  +------------------+
  Low Address

After Buffer Overflow:
  High Address
  +------------------+
  |   Parameters     |
  +------------------+
  |  MALICIOUS CODE  |  <-- overwritten return address
  +------------------+
  |  NOP Sled +      |
  |  Shellcode       |  <-- injected code in buffer
  +------------------+
  Low Address

When function returns, execution jumps to shellcode.
`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-6 h-6 text-gray-500" />
              System and Network Threats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700">
              System and network threats exploit vulnerabilities in networked systems to gain unauthorized access, disrupt services, or intercept communications.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Worms and Port Scanning</h4>
                <p className="text-sm text-gray-700 mb-2">
                  A <strong>worm</strong> is a self-replicating program that spreads across networks without needing to attach to a host program. It exploits network services to propagate.
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Morris Worm (1988):</strong> Exploited buffer overflows in UNIX services, infecting ~6,000 systems (10% of the Internet).</li>
                  <li>• <strong>Port scanning:</strong> Attackers probe open ports to discover running services and potential vulnerabilities. Tools like nmap automate this process.</li>
                </ul>
                <div className="bg-gray-900 p-2 rounded text-xs text-gray-300 font-mono mt-2">
{`# Example nmap scan
nmap -sV -p 1-65535 192.168.1.1
# Scans all ports and identifies service versions`}
                </div>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Denial of Service (DoS) and DDoS</h4>
                <p className="text-sm text-gray-700 mb-2">
                  DoS attacks overwhelm system resources to prevent legitimate access. <strong>Distributed DoS (DDoS)</strong> uses many compromised machines (botnets) to amplify the attack.
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Volumetric attacks:</strong> Flood the network with traffic (UDP floods, ICMP floods).</li>
                  <li>• <strong>Protocol attacks:</strong> Consume server resources (SYN floods, Ping of Death).</li>
                  <li>• <strong>Application-layer attacks:</strong> Target specific application logic (HTTP floods, Slowloris).</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-100 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Man-in-the-Middle (MitM) Attacks</h4>
              <p className="text-sm text-gray-700 mb-3">
                An attacker secretly intercepts and potentially alters communications between two parties. Common techniques include ARP spoofing, DNS hijacking, and rogue WiFi access points.
              </p>
              <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                <pre className="text-gray-300 text-xs font-mono">
{`
Normal Communication:
  Alice <------------------------> Bob
            Encrypted Channel

Man-in-the-Middle:
  Alice <--------> Attacker <--------> Bob
         (Fake cert)          (Real cert)
  
  Alice thinks she is talking to Bob,
  but the attacker decrypts, reads,
  possibly modifies, and re-encrypts
  all messages.
`}
                </pre>
              </div>
              <p className="text-sm text-gray-700 mt-3">
                Defense: certificate pinning, HSTS (HTTP Strict Transport Security), and vigilant certificate validation.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-6 h-6 text-gray-500" />
              Cryptography as a Security Tool
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700">
              Cryptography transforms data to prevent unauthorized access, verify authenticity, and ensure integrity. It is the foundation of secure communication on the Internet.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Symmetric Encryption</h4>
                <p className="text-sm text-gray-700 mb-2">
                  The same key is used for both encryption and decryption. Fast and efficient for large amounts of data, but key distribution is challenging.
                </p>
                <div className="bg-gray-900 p-3 rounded text-xs text-gray-300 font-mono">
{`Plaintext + Key(K) --encrypt--> Ciphertext
Ciphertext + Key(K) --decrypt--> Plaintext

Examples:
  AES-256 (current standard)
  ChaCha20 (stream cipher, mobile/TLS)
  DES, 3DES (deprecated)`}
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  AES-256 operates on 128-bit blocks with 256-bit keys. It supports ECB, CBC, CTR, and GCM modes. GCM provides both encryption and authentication.
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Asymmetric Encryption</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Uses a pair of mathematically related keys: a public key for encryption and a private key for decryption. Enables secure communication without shared secrets.
                </p>
                <div className="bg-gray-900 p-3 rounded text-xs text-gray-300 font-mono">
{`Plaintext + Public Key(P) --encrypt--> Ciphertext
Ciphertext + Private Key(S) --decrypt--> Plaintext

Examples:
  RSA (factoring-based)
  ECC/Elliptic Curve (smaller keys, same security)
  Diffie-Hellman (key exchange)`}
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  RSA-2048 provides security comparable to AES-128. ECC P-256 provides similar security with much smaller keys, making it ideal for mobile and TLS.
                </p>
              </div>
            </div>

            <div className="bg-gray-100 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Digital Signatures and Certificates</h4>
              <p className="text-sm text-gray-700 mb-3">
                A digital signature proves the authenticity and integrity of a message. The sender hashes the message and encrypts the hash with their private key. The receiver decrypts it with the sender's public key and compares it to a locally computed hash.
              </p>
              <div className="bg-gray-900 p-3 rounded text-xs text-gray-300 font-mono">
{`Signing:
  hash = SHA-256(message)
  signature = encrypt(hash, sender_private_key)

Verification:
  hash = SHA-256(message)
  decrypted_hash = decrypt(signature, sender_public_key)
  assert hash == decrypted_hash

Digital Certificates:
  A certificate binds a public key to an identity
  (e.g., google.com) and is signed by a trusted
  Certificate Authority (CA).`}
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">TLS/SSL Handshake Overview</h4>
              <p className="text-sm text-gray-700 mb-3">
                Transport Layer Security (TLS) establishes an encrypted channel between client and server. TLS 1.3 simplifies and speeds up the handshake compared to TLS 1.2.
              </p>
              <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                <pre className="text-gray-300 text-xs font-mono">
{`
TLS 1.3 Handshake (Simplified):

Client                              Server
  |                                   |
  |-- ClientHello + KeyShare -------->|
  |    (proposes cipher suites)       |
  |                                   |
  |<-- ServerHello + KeyShare --------|
  |    + EncryptedExtensions          |
  |    + Certificate                  |
  |    + CertificateVerify            |
  |    + Finished                     |
  |                                   |
  |-- Finished ---------------------->|
  |                                   |
  |==== Encrypted Application Data ===|

Both sides derive session keys from the shared
secret established via Diffie-Hellman key exchange.
`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-gray-500" />
              User Authentication
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700">
              Authentication verifies the identity of a user or system. Strong authentication typically combines multiple factors.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Something You Know</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Passwords and passphrases</li>
                  <li>• PINs</li>
                  <li>• Security questions</li>
                </ul>
                <p className="text-xs text-gray-600 mt-2">Vulnerable to guessing, phishing, and dictionary attacks.</p>
              </div>
              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Something You Have</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Smart cards and hardware tokens</li>
                  <li>• Mobile phones (SMS, TOTP apps)</li>
                  <li>• Security keys (YubiKey, FIDO2)</li>
                </ul>
                <p className="text-xs text-gray-600 mt-2">Vulnerable to theft but resistant to remote attacks.</p>
              </div>
              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Something You Are</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Fingerprint recognition</li>
                  <li>• Iris and retina scans</li>
                  <li>• Facial recognition</li>
                  <li>• Voice recognition</li>
                </ul>
                <p className="text-xs text-gray-600 mt-2">Vulnerable to spoofing and privacy concerns.</p>
              </div>
            </div>

            <div className="bg-gray-100 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Password Security Best Practices</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-sm">Storage</p>
                  <ul className="text-xs text-gray-600 mt-1 space-y-1">
                    <li>• Never store plaintext passwords</li>
                    <li>• Use slow hashing algorithms: bcrypt, scrypt, Argon2</li>
                    <li>• Always use unique salts per password</li>
                    <li>• Pepper (server-side secret) adds extra defense</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-sm">Policy</p>
                  <ul className="text-xs text-gray-600 mt-1 space-y-1">
                    <li>• Minimum length (12+ characters recommended)</li>
                    <li>• Check against breached password databases</li>
                    <li>• Implement rate limiting and account lockout</li>
                    <li>• Enforce MFA for sensitive accounts</li>
                  </ul>
                </div>
              </div>
              <div className="bg-gray-900 p-3 rounded text-xs text-gray-300 font-mono mt-4">
{`// Secure password hashing (pseudocode)
hash = argon2id(password, salt, memory=64MB, iterations=3, parallelism=4)
store(hash, salt)

// Verification
computed_hash = argon2id(input_password, stored_salt, ...)
assert secure_compare(computed_hash, stored_hash)`}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-gray-500" />
              Implementing Security Defenses
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700">
              Defense in depth requires multiple layers of security controls across the network, system, application, and data layers.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Firewalls</h4>
                <p className="text-sm text-gray-700 mb-2">
                  A firewall monitors and controls incoming and outgoing network traffic based on predetermined security rules.
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Packet-filtering:</strong> Inspects headers (IP, port, protocol). Fast but stateless.</li>
                  <li>• <strong>Stateful inspection:</strong> Tracks active connections and allows return traffic.</li>
                  <li>• <strong>Application-layer (WAF):</strong> Inspects HTTP payloads to block SQL injection, XSS, etc.</li>
                  <li>• <strong>Next-Gen Firewall (NGFW):</strong> Integrates IDS/IPS, deep packet inspection, and application awareness.</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Intrusion Detection and Prevention</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Systems that monitor network or system activities for malicious behavior or policy violations.
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>IDS (Intrusion Detection System):</strong> Alerts on suspicious activity but does not block it.</li>
                  <li>• <strong>IPS (Intrusion Prevention System):</strong> Actively blocks or drops malicious traffic.</li>
                  <li>• <strong>HIDS:</strong> Host-based, monitors system logs and file integrity.</li>
                  <li>• <strong>NIDS:</strong> Network-based, inspects traffic patterns and signatures.</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-100 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Auditing and Logging</h4>
              <p className="text-sm text-gray-700 mb-3">
                Comprehensive logging is essential for detecting breaches, investigating incidents, and ensuring compliance.
              </p>
              <div className="bg-gray-900 p-3 rounded text-xs text-gray-300 font-mono">
{`# Critical events to log
- Authentication attempts (success and failure)
- Privilege escalation (sudo, setuid)
- File access and modifications
- Network connections (source IP, port, duration)
- System configuration changes
- Application errors and exceptions

# Security best practices
- Centralize logs (SIEM: Splunk, ELK, Graylog)
- Protect log integrity (write-once storage, signing)
- Set retention policies per compliance requirements
- Monitor for anomalies (unusual login times, geo-impossible travel)`}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card className="border-l-4 border-gray-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="w-6 h-6 text-gray-500" />
              Real-World: Secure Engineering Practices
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs defaultValue="owasp" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="owasp">OWASP & Coding</TabsTrigger>
                <TabsTrigger value="memory">Memory Safety</TabsTrigger>
                <TabsTrigger value="containers">Container Security</TabsTrigger>
                <TabsTrigger value="patching">Patching & CVEs</TabsTrigger>
              </TabsList>

              <TabsContent value="owasp" className="mt-4 space-y-4">
                <p className="text-sm text-gray-700">
                  The OWASP Top 10 is a standard awareness document for web application security. Understanding and mitigating these risks is fundamental for backend engineers.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="p-3 text-left">Risk</th>
                        <th className="p-3 text-left">Description</th>
                        <th className="p-3 text-left">Mitigation</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Injection</td>
                        <td className="p-3">SQL, NoSQL, OS command injection</td>
                        <td className="p-3">Parameterized queries, input validation</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Broken Auth</td>
                        <td className="p-3">Weak credentials, session management flaws</td>
                        <td className="p-3">MFA, strong session tokens, rate limiting</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Sensitive Data Exposure</td>
                        <td className="p-3">Unencrypted data at rest or in transit</td>
                        <td className="p-3">TLS 1.3, encryption at rest, key management</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-medium">XXE</td>
                        <td className="p-3">XML External Entity attacks</td>
                        <td className="p-3">Disable DTDs, use JSON instead of XML</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Broken Access Control</td>
                        <td className="p-3">Users can access unauthorized resources</td>
                        <td className="p-3">Deny by default, RBAC, server-side enforcement</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">Vulnerable Components</td>
                        <td className="p-3">Outdated libraries with known vulnerabilities</td>
                        <td className="p-3">Dependency scanning, automated patching</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="bg-gray-900 p-3 rounded text-xs text-gray-300 font-mono">
{`// Vulnerable SQL query (NEVER DO THIS)
String query = "SELECT * FROM users WHERE name = '" + username + "'";

// Secure parameterized query
String query = "SELECT * FROM users WHERE name = ?";
PreparedStatement stmt = connection.prepareStatement(query);
stmt.setString(1, username);`}
                </div>
              </TabsContent>

              <TabsContent value="memory" className="mt-4 space-y-4">
                <p className="text-sm text-gray-700">
                  Buffer overflows remain a critical class of vulnerabilities. Modern systems employ multiple hardware and software mitigations.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold text-sm">ASLR (Address Space Layout Randomization)</p>
                    <p className="text-xs text-gray-600 mt-1">Randomizes the base addresses of stack, heap, and libraries on every execution. Makes it difficult for attackers to predict target addresses for jumps.</p>
                    <div className="bg-gray-900 p-2 rounded text-xs text-gray-300 font-mono mt-2">
{`# Check ASLR status on Linux
cat /proc/sys/kernel/randomize_va_space
# 0 = disabled, 1 = conservative, 2 = full

# Enable full ASLR
sudo sysctl -w kernel.randomize_va_space=2`}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold text-sm">DEP/NX (Data Execution Prevention)</p>
                    <p className="text-xs text-gray-600 mt-1">Marks memory regions (stack, heap) as non-executable. Prevents execution of injected shellcode on the stack.</p>
                    <div className="bg-gray-900 p-2 rounded text-xs text-gray-300 font-mono mt-2">
{`# Check NX bit support
dmesg | grep NX
# NX (Execute Disable) protection: active

# Modern CPUs support this in hardware
# OS enforces it via page table flags`}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-sm">Stack Canaries</p>
                  <p className="text-xs text-gray-600 mt-1">A random value placed between local variables and the return address. If a buffer overflow overwrites the canary, the program detects the corruption and aborts before the return address is used.</p>
                  <div className="bg-gray-900 p-2 rounded text-xs text-gray-300 font-mono mt-2">
{`# Compile with stack protection
gcc -fstack-protector-strong program.c

# Check if binary has stack canaries
checksec --file=/bin/ls
# STACK CANARY: Canary found`}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="containers" className="mt-4 space-y-4">
                <p className="text-sm text-gray-700">
                  Container security requires hardening at multiple levels: image scanning, runtime protection, least privilege, and network segmentation.
                </p>
                <div className="bg-gray-900 p-3 rounded text-xs text-gray-300 font-mono">
{`# Dockerfile security best practices
FROM alpine:3.18@sha256:...  # Pin exact image hash
RUN apk add --no-cache python3
RUN adduser -D -s /bin/sh appuser
USER appuser                 # Don't run as root
COPY --chown=appuser:appuser . /app
WORKDIR /app
EXPOSE 8080
CMD ["python3", "server.py"]

# Build with no-cache to avoid stale layers
docker build --no-cache -t myapp .

# Scan image for vulnerabilities
docker scan myapp
trivy image myapp`}
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-gray-50 p-3 rounded border">
                    <p className="font-semibold text-sm">Runtime Hardening</p>
                    <ul className="text-xs text-gray-600 mt-1 space-y-1">
                      <li>• Read-only root filesystem</li>
                      <li>• Drop all capabilities, add only needed ones</li>
                      <li>• No-new-privileges flag</li>
                      <li>• Seccomp and AppArmor profiles</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-3 rounded border">
                    <p className="font-semibold text-sm">Image Scanning</p>
                    <ul className="text-xs text-gray-600 mt-1 space-y-1">
                      <li>• Scan base images for OS CVEs</li>
                      <li>• Scan application dependencies</li>
                      <li>• Use minimal base images (distroless, Alpine, scratch)</li>
                      <li>• Sign images with Notary/Cosign</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="patching" className="mt-4 space-y-4">
                <p className="text-sm text-gray-700">
                  Vulnerabilities are tracked as Common Vulnerabilities and Exposures (CVEs). A disciplined patching strategy is critical for maintaining security posture.
                </p>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">CVE Severity Scoring (CVSS)</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="p-2 text-left">Severity</th>
                          <th className="p-2 text-left">CVSS Score</th>
                          <th className="p-2 text-left">Typical Response Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2 font-medium">Critical</td>
                          <td className="p-2">9.0 - 10.0</td>
                          <td className="p-2">24-72 hours</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-medium">High</td>
                          <td className="p-2">7.0 - 8.9</td>
                          <td className="p-2">1-2 weeks</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-medium">Medium</td>
                          <td className="p-2">4.0 - 6.9</td>
                          <td className="p-2">1 month</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">Low</td>
                          <td className="p-2">0.1 - 3.9</td>
                          <td className="p-2">Next maintenance window</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="bg-gray-900 p-3 rounded text-xs text-gray-300 font-mono">
{`# Automated patching workflow
1. Subscribe to security advisories (OS vendor, application vendor)
2. Run automated vulnerability scans daily
3. Triage by CVSS score and exploitability
4. Test patches in staging environment
5. Deploy patches using rolling updates / blue-green deployment
6. Verify patch application and system health
7. Document exceptions and compensating controls

# Useful tools:
# - apt list --upgradable
# - yum updateinfo list security
# - unattended-upgrades (Debian/Ubuntu)
# - AWS Systems Manager Patch Manager`}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn}>
        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-gray-500" />
              Key Takeaways
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                "Security aims to protect the CIA triad: Confidentiality, Integrity, and Availability",
                "Program threats include trojan horses, trap doors, logic bombs, buffer overflows, and viruses",
                "Network threats include worms, port scanning, DoS/DDoS, and man-in-the-middle attacks",
                "Cryptography provides confidentiality (symmetric/asymmetric encryption), authenticity (digital signatures), and trust (certificates/TLS)",
                "Strong authentication combines multiple factors: something you know, have, and are",
                "Defense in depth requires firewalls, IDS/IPS, auditing, and secure coding practices",
                "Buffer overflow mitigations include ASLR, DEP/NX, and stack canaries",
                "Container security requires image scanning, least privilege, seccomp, and runtime hardening",
                "A disciplined patching strategy based on CVSS scoring is essential for managing CVEs"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-500 text-white flex items-center justify-center text-sm font-semibold">
                    {i + 1}
                  </span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
