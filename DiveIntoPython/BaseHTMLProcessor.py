from sgmllib import SGMLParser
import htmlentitydefs

class BaseHTMLProcessor(SGMLParser):
	def reset(self):
		#extend (called by SGMLParser.__init__)
		self.pieces = []
		SGMLParser.reset(self)
		
	def unknown_starttag(self, tag, attrs):
		# called for each start tag
		# attrs is a list of (attr, value) tuples
		# e.g. for <pre class="screen">, tag="pre", attrs=[("class","screen")]
		# Ideally we would like to reconstruction original tag and attributes, but
		# we may end up quoting attribute values that weren't quoted in the source
		# document, or we may change the type of quotes around the attribute value
		# (single to double quotes).
		# Not that improperly embedded non-HTML code (like client-side Javascript)
		# may be parsed incorrectly by the ancestor, causing runtime script errors.
		# All non-HTML code must be encloded in HTML comment tags (<!-- code -->)
		# to ensure that it will pass through this parser unalters (in handle_comment). 
		strattrs = "".join([' %s="%s"' % (key, value) for key, value in attrs])
		self.pieces.append("<%(tag)s%(strattrs)s>" % locals())
		
	def unknown_endtag(self, tag):
		# called for each end tag, e.g. for </pre>, tag will be "pre"
		# Reconstruct the original end tag.
		self.pieces.append("</%(tag)s>" % locals())
		
	def handle_charref(self, ref):
		# called for each characer reference, e.g. for "&#160;", ref will be "160"
		# reconstruct the original character referece.
		self.pieces.append("&#%(ref)s;" % locals())
		
	def handle_entityref(self, ref):
		# called for each entity reference, e.g. for "&copy;", ref wil be "copy"
		# reconstruct the original entity reference.
		self.pieces.append("&%(ref)s" % locals())
		# standard HTML entities are closed with a semicolon; other entities are not
		if htmlentitydefs.entitydefs.has_key(ref):
			self.pieces.append(";")
			
	def handle_data(self, text):
		# called for each block of plain text, i.e. outside of any tag and
		# not containing any character or entity references
		# Store the orignal text verbatim
		self.pieces.append(text)
		
	def handle_comment(self, text):
		# called for each HTML comment, e.g. <!-- insert Javascript code here -->
		# reconstruct the original comment.
		# It is especially important that with source document enclose client-side
		# code (like Javascript) within comments so it can pass through this
		# processor undisturbed; see comments in unknown_starttag for details.
		self.pieces.append("<!--%(text)s-->" % locals())
		
	def handle_pi(self, text):
		# called for each processing instruction, e.g. <?instruction>
		# reconstruct original processing instruction.
		self.pieces.append("<?%(text)s>" % locals())
		
	def handle_decl(self, text):
		# caleld for the DOCTYPE, if present, e.g.
		# <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
		#      "http://www.w3.org/TR/html4/loose.dtd">
		# Reconstruct original DOCTYPE
		self.pieces.append("<!%(text)s>" % locals())
		
	def output(self):
		"""Return processed HTML as a single string"""
		return "".join(self.pieces)